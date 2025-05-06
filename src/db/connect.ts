import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {Either} from '../utils/either.js';

dotenv.config();

export const connectDB: () => Promise<Either<string, void>> = async () => {
  if (process.env.DB_HOST) {
    await mongoose.connect(process.env.DB_HOST);
    console.log('Connected to MongoDB');
    return { kind: 'right', value: undefined };
  }
  return { kind: 'left', value: 'Environment variable MONGO_URI is not set' };
};
