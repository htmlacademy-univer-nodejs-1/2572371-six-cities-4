import 'reflect-metadata';
import config from './config.js';
import { Application } from './application.js';
import {create} from './container.js';

const container = create();
const app = container.get<Application>('App');

await app.init();
app.logger.info(`Server is running on port ${config.get('port')}`);
