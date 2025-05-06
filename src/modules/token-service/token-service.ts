import {injectable} from 'inversify';
import {TokenService} from './token-service.interface.js';
import {Token, TokenModel} from './token-dbo.js';

@injectable()
export class TokenDatabaseService implements TokenService {
  async find(query: Partial<Token>): Promise<Token[]> {
    return TokenModel.find(query).exec();
  }

  async delete(token: string): Promise<Token> {
    const deletedToken = await TokenModel.findOneAndDelete({token}).exec();
    if (!deletedToken) {
      throw new Error('Token not found');
    }
    return deletedToken;
  }

  async create(document: Token): Promise<Token> {
    const user = new TokenModel(document);
    return user.save();
  }

  async findById(id: string): Promise<Token | null> {
    return TokenModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<Token | null> {
    return TokenModel.findOne({email}).exec();
  }
}
