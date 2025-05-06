import { DatabaseOperationsInterface } from '../../db/database-operations.interface.js';
import {Comment} from './comment.dbo.js';
import {ObjectId} from 'mongoose';

export interface CommentServiceInterface extends DatabaseOperationsInterface<Comment>
{
  deleteByOfferId(id: ObjectId): Promise<void>;
  findByOfferId(id: ObjectId, count: number): Promise<Comment[]>;
}
