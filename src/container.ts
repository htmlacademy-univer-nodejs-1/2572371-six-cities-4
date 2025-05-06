import 'reflect-metadata';
import { Container } from 'inversify';
import {createOfferContainer} from './modules/rental-offers/rental-offer.container.js';
import {createUsersContainer} from './modules/users/user-service.container.js';
import {Application} from './application.js';
import {Config} from 'convict';
import config, {AppConfig} from './config.js';
import {Logger} from 'pino';
import appLogger from './appLogger.js';

export function create() {
  const container = new Container();
  container.bind<Application>('App').to(Application).inSingletonScope();
  container.bind<Logger>('Log').toConstantValue(appLogger);
  container.bind<Config<AppConfig>>('Config').toConstantValue(config);

  container.loadSync(createUsersContainer())
  container.loadSync(createOfferContainer())

  return container;
}

