import {injectable} from 'inversify';
import {User, UserModel} from './user-dbo.js';
import {UserService} from './user-service.interface.js';
import mongoose from 'mongoose';

@injectable()
export class UserDatabaseService implements UserService {
  async find(query: Partial<User>): Promise<User[]> {
    return UserModel.find(query).exec();
  }

  async create(document: User): Promise<User> {
    const user = new UserModel(document);
    return user.save();
  }

  async findById(id: mongoose.Types.ObjectId): Promise<User | null> {
    return UserModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }).exec();
  }
}
