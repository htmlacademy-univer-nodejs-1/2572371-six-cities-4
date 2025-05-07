import mongoose, {Model} from 'mongoose';

export type User = {
  id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  avatar: string;
  passwordHash: string;
  type: 'usual' | 'pro';
  favorite: string[];
};

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  name: {type: String, required: true, minlength: 1, maxlength: 15},
  password: {type: String, required: true},
  avatar: {type: String, required: false},
  passwordHash: {type: String, required: true},
  favorite: {type: [mongoose.Schema.Types.ObjectId], ref: 'RentalOffer', default: []},
});

export const UserModel: Model<User> = mongoose.model<User>('User', userSchema);
