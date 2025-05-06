import mongoose, { Model } from 'mongoose';

export type User = {
  email: string;
  name: string;
  avatar: string;
  passwordHash: string;
  type: 'usual' | 'pro';
};

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, minlength: 1, maxlength: 15 },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  passwordHash: { type: String, required: true },
});

export const UserModel: Model<User> = mongoose.model<User>('User', userSchema);
