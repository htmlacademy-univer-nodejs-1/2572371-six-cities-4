import {ContainerModule} from 'inversify';
import {UserService} from './user-service.interface.js';
import {UserDatabaseService} from './user-service.js';
import {UserModel} from './user-dbo.js';

export function createUsersContainer() {
  return new ContainerModule((options) => {
    options.bind('UserService').toConstantValue(UserModel);
    options.bind<UserService>(Symbol.for('UserService')).to(UserDatabaseService);
  });
}
