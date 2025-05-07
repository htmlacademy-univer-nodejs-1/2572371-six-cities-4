import express, {Express} from 'express';
import {inject, injectable} from 'inversify';
import {Logger} from 'pino';
import {Config} from 'convict';
import {AppConfig} from './config.js';
import {ExceptionFilterInterface} from './modules/rest/exception-filter/exception-filter.interface.js';
import {ControllerInterface} from './modules/rest/controller/controller.interface.js';
import {OfferController} from './modules/rest/controller/offer.controller.js';
import {connectDB} from './db/connect.js';
import {UserController} from './modules/rest/controller/user.controller.js';
import {CommentsController} from './modules/rest/controller/comments.controller.js';
import {FavoritesController} from './modules/rest/controller/favorites.controller.js';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const createDirIfNotExists = async (path: string): Promise<void> => {
  try {
    await mkdir(path, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
      throw error;
    }
  }
};


@injectable()
export class Application {
  private express: Express;

  constructor(
    @inject('Log') public readonly logger: Logger,
    @inject('Config') private readonly config: Config<AppConfig>,
    @inject('ExceptionFilter') private readonly exceptionFilter: ExceptionFilterInterface,
    @inject('OfferController') private readonly offersController: OfferController,
    @inject('UsersController') private readonly usersController: UserController,
    @inject('CommentsController') private readonly commentsController: CommentsController,
    @inject('FavoritesController') private readonly favoritesController: FavoritesController,
  ) {
    this.express = express();
  }

  public registerRoutes(controllers: ControllerInterface[]): void {
    for (const controller of controllers) {
      this.express.use('/api', controller.router);
      this.logger.info(`Controller registered: ${controller.constructor.name}`);
    }
  }

  public async registerMiddlewares(): Promise<void> {
    const uploadDirectoryPath = this.config.get('UPLOAD_DIRECTORY_PATH');
    const avatarUploadPath = resolve(uploadDirectoryPath, 'avatars');
    const offerUploadPath = resolve(uploadDirectoryPath, 'offers');
    const tmpUploadPath = resolve(uploadDirectoryPath, 'tmp');

    await createDirIfNotExists(uploadDirectoryPath);
    await createDirIfNotExists(avatarUploadPath);
    await createDirIfNotExists(offerUploadPath);
    await createDirIfNotExists(tmpUploadPath);

    this.express.use(express.json());
    this.express.use('/uploads', express.static(uploadDirectoryPath));

    this.logger.info('Middleware express.json registered');
  }

  public registerExceptionFilters(): void {
    this.express.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    this.logger.info('Exception filter registered');
  }

  public async init(): Promise<void> {
    await this.registerMiddlewares();
    this.registerExceptionFilters();
    this.registerRoutes([this.offersController, this.commentsController, this.favoritesController, this.usersController]);

    await connectDB(this.logger);

    const port = this.config.get().PORT;

    this.express.listen(port, () => {
      this.logger.info(`Server started on http://localhost:${port}`);
    });
  }
}
