import {DatabaseOperationsInterface} from '../../db/database-operations.interface.js';
import {RentalOffer} from './rental-offer.dbo.js';
import mongoose from 'mongoose';

export interface RentalServiceInterface extends DatabaseOperationsInterface<RentalOffer> {
  deleteById(id: mongoose.Types.ObjectId): Promise<void>;
  findByIds(ids: mongoose.Types.ObjectId[]): Promise<RentalOffer[]>;
  findById(id: mongoose.Types.ObjectId): Promise<RentalOffer | null>;
  update(document: Partial<RentalOffer>): Promise<void>;
}
