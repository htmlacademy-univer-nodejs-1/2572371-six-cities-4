import { injectable, inject } from 'inversify';
import { Logger } from 'pino';

@injectable()
export class Application {
  constructor(@inject('Logger') public logger: Logger) {}

  public init() {
    this.logger.info('Application initialized');
  }
}
