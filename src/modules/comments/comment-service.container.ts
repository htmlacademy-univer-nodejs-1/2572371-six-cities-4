import {ContainerModule} from 'inversify';
import {CommentService} from './comment-service.js';
import {CommentServiceInterface} from './comment-service.interface.js';
import {CommentDbo} from './comment.dbo.js';

export function createCommentsContainer(): ContainerModule {
  return new ContainerModule((bind) => {
    bind.bind<CommentServiceInterface>('CommentService').to(CommentService);
    bind.bind(Symbol.for('CommentModel')).toConstantValue(CommentDbo);
  });
}
