import 'reflect-metadata';
import { Application } from './application.js';
import {create} from './container.js';
import {config} from './config.js';

const container = create();
const app = container.get<Application>('App');

await app.init();
app.logger.info(`Server is running on port ${config.getProperties().PORT}`);
