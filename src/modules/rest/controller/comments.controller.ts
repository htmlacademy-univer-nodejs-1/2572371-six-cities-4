import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from './controller.abstract.js';
import {Logger} from 'pino';
import {CommentServiceInterface} from '../../comments/comment-service.interface.js';
import mongoose from 'mongoose';
import {Comment, CreateCommentDto} from '../dtos/index.js';
import {UserService} from '../../users/user-service.interface.js';
import {TokenService} from '../../token-service/token-service.interface.js';
import {ValidateObjectIdMiddleware} from '../middleware/validate-objectid.middleware.js';
import {ValidateDtoMiddleware} from '../middleware/validate-dto.middleware.js';

@injectable()
export class CommentsController extends Controller {
  constructor(
    @inject('Log') protected readonly logger: Logger,
    @inject('UserService') protected readonly userService: UserService,
    @inject('CommentService') private readonly commentService: CommentServiceInterface,
    @inject('Token') private readonly tokenService: TokenService
  ) {
    super(logger);

    this.logger.info('Register routes for CommentsController...');

    this.addRoute({
      path: '/offers/:offerId/comments',
      method: 'get',
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });

    this.addRoute({
      path: '/offers/:offerId/comments',
      method: 'post',
      handler: this.createComment,
      middlewares: [new ValidateObjectIdMiddleware('offerId'), new ValidateDtoMiddleware(CreateCommentDto)]
    });
  }

  public async getComments({params}: Request, res: Response): Promise<void> {
    const {offerId} = params;
    const comments = await this.commentService.findByOfferId(new mongoose.Types.ObjectId(offerId), 50);

    const commentsDto: (Comment | undefined)[] = (await Promise.all(comments.map(async (c) => {
      if (!c) {
        return undefined;
      }
      const user = await this.userService.findById(new mongoose.Types.ObjectId(c.userId));
      if (!user) {
        return undefined;
      }
      return {
        id: c.id,
        text: c.text,
        rating: c.rating,
        publicationDate: c.createdAt?.toDateString(),
        user: {
          id: user.id.toString(),
          name: user.name,
          avatarUrl: user.avatar,
          email: user.email,
          type: user.type
        }
      };
    }))).filter((c) => c !== undefined);

    this.ok(res, commentsDto);
  }

  public async createComment(req: Request, res: Response): Promise<void> {
    const authToken = req.headers.authorization?.split(' ')[1];
    const userEmail = authToken ? await this.tokenService.findById(authToken)
      .then((token) => token?.userId)
      .then((userId) => userId
        ? this.userService.findById(new mongoose.Types.ObjectId(userId))
        : null
      )
      .then((user) => user?.id) : null;

    const {offerId} = req.params;
    await this.commentService.create({
      ...req.body,
      offerId,
      userId: userEmail
    });
    this.created(res, null);
  }
}
