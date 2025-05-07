import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';
import mongoose from 'mongoose';
import {Controller} from './controller.abstract.js';
import {Logger} from 'pino';
import {RentalServiceInterface} from '../../rental-offers/rental-service.interface.js';
import {UserService} from '../../users/user-service.interface.js';
import {TokenService} from '../../token-service/token-service.interface.js';
import {ValidateObjectIdMiddleware} from '../middleware/validate-objectid.middleware.js';

@injectable()
export class FavoritesController extends Controller {
  constructor(
    @inject('Log') protected readonly logger: Logger,
    @inject('RentalService') private readonly offerService: RentalServiceInterface,
    @inject('UserService') private readonly userService: UserService,
    @inject('TokenService') private readonly tokenService: TokenService
  ) {
    super(logger);

    this.logger.info('Register routes for FavoritesController...');

    this.addRoute({
      path: '/favorites',
      method: 'get',
      handler: this.getFavorites,
    });

    this.addRoute({
      path: '/favorites/:offerId/:status',
      method: 'post',
      handler: this.toggleFavoriteStatus,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  public async getFavorites(req: Request, res: Response): Promise<void> {
    this.logger.info('Getting user favorites');

    const authToken = req.headers.authorization?.split(' ')[1];

    if (!authToken) {
      this.send(res, StatusCodes.UNAUTHORIZED, {message: 'Unauthorized'});
      return;
    }

    const userId = await this.tokenService.findById(authToken)
      .then((token) => token?.userId);

    if (!userId) {
      this.send(res, StatusCodes.UNAUTHORIZED, {message: 'Unauthorized'});
      return;
    }

    const user = await this.userService.findById(new mongoose.Types.ObjectId(userId));

    if (!user) {
      this.send(res, StatusCodes.NOT_FOUND, {message: 'User not found'});
      return;
    }

    const favoriteOffers = await this.offerService.findByIds(
      user.favorite.map(
        (id) => new mongoose.Types.ObjectId(id)
      )
    );

    this.ok(res, favoriteOffers);
  }

  public async toggleFavoriteStatus(req: Request, res: Response): Promise<void> {
    const {offerId, status} = req.params;

    if (status !== '0' && status !== '1') {
      this.send(res, StatusCodes.BAD_REQUEST, {message: 'Status must be 0 or 1'});
      return;
    }

    const isFavorite = status === '1';

    this.logger.info(`${isFavorite ? 'Adding to' : 'Removing from'} favorites: ${offerId}`);

    const authToken = req.headers.authorization?.split(' ')[1];

    if (!authToken) {
      this.send(res, StatusCodes.UNAUTHORIZED, {message: 'Unauthorized'});
      return;
    }

    const userId = await this.tokenService.findById(authToken)
      .then((token) => token?.userId);

    if (!userId) {
      this.send(res, StatusCodes.UNAUTHORIZED, {message: 'Unauthorized'});
      return;
    }

    const user = await this.userService.findById(new mongoose.Types.ObjectId(userId));

    if (!user) {
      this.send(res, StatusCodes.NOT_FOUND, {message: 'User not found'});
      return;
    }

    const offer = await this.offerService.findById(new mongoose.Types.ObjectId(offerId));

    if (!offer) {
      this.send(res, StatusCodes.NOT_FOUND, {message: `Offer with id ${offerId} not found`});
      return;
    }

    if (isFavorite) {
      await this.userService.addToFavorites(new mongoose.Types.ObjectId(userId), offerId);
    } else {
      await this.userService.removeFromFavorites(new mongoose.Types.ObjectId(userId), offerId);
    }

    const updatedOffer = {...offer, isFavorite};

    this.ok(res, updatedOffer);
  }
}
