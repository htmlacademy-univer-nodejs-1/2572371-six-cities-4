import { DatabaseOperationsInterface } from '../../db/database-operations.interface.js';
import {Comment} from './comment.dbo.js';

export interface CommentServiceInterface extends DatabaseOperationsInterface<Comment>
{

}
