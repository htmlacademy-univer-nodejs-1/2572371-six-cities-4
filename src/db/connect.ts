import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {Either} from '../utils/either.js';
import {Logger} from 'pino';

dotenv.config();

export async function connectDB(log: Logger): Promise<Either<string, void>> {
  if (process.env.DB_HOST) {
    await mongoose.connect(process.env.DB_HOST);
    log.info('Connected to MongoDB');
    return { kind: 'right', value: undefined };
  }
  return { kind: 'left', value: 'Environment variable MONGO_URI is not set' };
}
