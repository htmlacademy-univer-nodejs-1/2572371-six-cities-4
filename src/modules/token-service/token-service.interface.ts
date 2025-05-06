import { DatabaseOperationsInterface } from '../../db/database-operations.interface.js';
import {Token} from './token-dbo.js';

export interface TokenService extends DatabaseOperationsInterface<Token> {
  findById(token: string): Promise<Token | null>;
  delete(token: string): Promise<Token | null>;
  findByEmail(email: string): Promise<Token | null>;
}
