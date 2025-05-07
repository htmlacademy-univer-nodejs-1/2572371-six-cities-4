import { DatabaseOperationsInterface } from '../../db/database-operations.interface.js';
import {Comment} from './comment.dbo.js';
import mongoose from 'mongoose';

export interface CommentServiceInterface extends DatabaseOperationsInterface<Comment>
{
  deleteByOfferId(id: mongoose.Types.ObjectId): Promise<void>;
  findByOfferId(id: mongoose.Types.ObjectId, count: number): Promise<Comment[]>;
}
