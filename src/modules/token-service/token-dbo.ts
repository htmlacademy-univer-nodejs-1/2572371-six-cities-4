import mongoose, { Model } from 'mongoose';

export type Token = {
  userId: mongoose.Schema.Types.ObjectId;
  refreshToken: string;
  userAgent: string;
  expiresAt: Date;
  createdAt: Date;
};

const tokenSchema = new mongoose.Schema<Token>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

tokenSchema.index({ userId: 1, refreshToken: 1 });
tokenSchema.index({ expiresAt: 1 });

export const TokenModel: Model<Token> = mongoose.model<Token>('Token', tokenSchema);
