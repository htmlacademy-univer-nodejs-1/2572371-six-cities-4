import 'reflect-metadata';
import container from './container.js';
import config from './config.js';
import { Application } from './application.js';

const app = container.get<Application>(Application);

app.init();
app.logger.info(`Server is running on port ${config.get('port')}`);
