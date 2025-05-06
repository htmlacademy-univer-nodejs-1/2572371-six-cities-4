import {User} from './user-dbo.js';
import {DatabaseOperationsInterface} from '../../db/database-operations.interface.js';
import mongoose from 'mongoose';

export interface UserService extends DatabaseOperationsInterface<User> {
  findById(id: mongoose.Schema.Types.ObjectId): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  addToFavorites(userId: mongoose.Schema.Types.ObjectId, offerId: string): Promise<void>;
  removeFromFavorites(userId: mongoose.Schema.Types.ObjectId, offerId: string): Promise<void>;
}
