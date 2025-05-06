import { ContainerModule } from 'inversify';
import {TokenModel} from './token-dbo.js';
import {TokenService} from './token-service.interface.js';
import {TokenDatabaseService} from './token-service.js';

export const TokenModule = new ContainerModule((bind) => {
  bind.bind('Token')
    .toConstantValue(TokenModel);

  bind.bind<TokenService>(Symbol.for('TokenService'))
    .to(TokenDatabaseService)
    .inSingletonScope();
});
