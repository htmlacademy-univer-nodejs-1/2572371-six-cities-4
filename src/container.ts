import { Container } from 'inversify';
import { Application } from './application.js';
import logger from './logger.js';

const container = new Container();

container.bind<Application>(Application).toSelf();
container.bind('Logger').toConstantValue(logger);

export default container;
