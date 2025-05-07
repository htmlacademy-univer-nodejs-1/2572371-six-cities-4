import { ContainerModule } from 'inversify';
import { ExceptionFilterInterface } from './exception-filter/exception-filter.interface.js';
import { ExceptionFilter } from './exception-filter/exception-filter.js';
import { ControllerInterface } from './controller/controller.interface.js';
import { UserController } from './controller/user.controller.js';
import { OfferController } from './controller/offer.controller.js';
import {CommentsController} from './controller/comments.controller.js';
import {FavoritesController} from './controller/favorites.controller.js';

export const RestModule = new ContainerModule((bind) => {
  bind.bind<ExceptionFilterInterface>('ExceptionFilter')
    .to(ExceptionFilter)
    .inSingletonScope();

  bind.bind<ControllerInterface>('UsersController')
    .to(UserController)
    .inSingletonScope();

  bind.bind<ControllerInterface>('OfferController')
    .to(OfferController)
    .inSingletonScope();

  bind.bind<ControllerInterface>('CommentsController')
    .to(CommentsController)
    .inSingletonScope();

  bind.bind<ControllerInterface>('FavoritesController')
    .to(FavoritesController)
    .inSingletonScope();
});
