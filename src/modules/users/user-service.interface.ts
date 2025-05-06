import {User} from './user-dbo.js';
import {DatabaseOperationsInterface} from '../../db/database-operations.interface.js';

export interface UserService extends DatabaseOperationsInterface<User> {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
