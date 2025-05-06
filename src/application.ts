import express, { Express } from 'express';
import {inject, injectable } from 'inversify';
import {Logger} from 'pino';
import {Config} from 'convict';
import {AppConfig} from './config.js';
import {ExceptionFilterInterface} from './modules/rest/exception-filter/exception-filter.interface.js';
import {ControllerInterface} from './modules/rest/controller/controller.interface.js';
import {OfferController} from './modules/rest/controller/offer.controller.js';

@injectable()
export class Application {
  private express: Express;

  constructor(
    @inject('Log') public readonly logger: Logger,
    @inject('Config') private readonly config: Config<AppConfig>,
    @inject('ExceptionFilter') private readonly exceptionFilter: ExceptionFilterInterface,
    @inject('OfferController') private readonly offersController: OfferController
  ) {
    this.express = express();
  }

  public registerRoutes(controllers: ControllerInterface[]): void {
    for (const controller of controllers) {
      this.express.use('/api', controller.router);
      this.logger.info(`Controller registered: ${controller.constructor.name}`);
    }
  }

  public registerMiddlewares(): void {
    this.express.use(express.json());
    this.logger.info('Middleware express.json registered');
  }

  public registerExceptionFilters(): void {
    this.express.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    this.logger.info('Exception filter registered');
  }

  public async init(): Promise<void> {
    this.registerMiddlewares();
    this.registerExceptionFilters();
    this.registerRoutes([this.offersController]);

    const port = this.config.get().port;

    this.express.listen(port, () => {
      this.logger.info(`Server started on http://localhost:${port}`);
    });
  }
}
