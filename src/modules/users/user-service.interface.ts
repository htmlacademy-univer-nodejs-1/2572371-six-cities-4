import {User} from './user-dbo.js';
import {DatabaseOperationsInterface} from '../../db/database-operations.interface.js';
import mongoose from 'mongoose';

export interface UserService extends DatabaseOperationsInterface<User> {
  findById(id: mongoose.Types.ObjectId): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
