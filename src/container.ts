import 'reflect-metadata';
import { Container } from 'inversify';
import {createOfferContainer} from './modules/rental-offers/rental-offer.container.js';
import {createUsersContainer} from './modules/users/user-service.container.js';
import {Application} from './application.js';
import {Config} from 'convict';
import {AppConfig, config} from './config.js';
import {Logger} from 'pino';
import appLogger from './appLogger.js';
import {createCommentsContainer} from './modules/comments/comment-service.container.js';
import {RestModule} from './modules/rest/rest.container.js';
import {TokenModule} from './modules/token-service/token-service.container.js';

export function create() {
  const container = new Container();
  container.bind<Application>('App').to(Application).inSingletonScope();
  container.bind<Logger>('Log').toConstantValue(appLogger);
  container.bind<Config<AppConfig>>('Config').toConstantValue(config);

  container.loadSync(createUsersContainer());
  container.loadSync(createOfferContainer());
  container.loadSync(createCommentsContainer());
  container.loadSync(RestModule);
  container.loadSync(TokenModule);

  return container;
}

