import {DatabaseOperationsInterface} from '../../db/database-operations.interface.js';
import {RentalOffer} from './rental-offer.dbo.js';
import mongoose from 'mongoose';

export interface RentalServiceInterface extends DatabaseOperationsInterface<RentalOffer> {
  deleteById(id: mongoose.Schema.Types.ObjectId): Promise<void>;
  findByIds(ids: mongoose.Schema.Types.ObjectId[]): Promise<RentalOffer[]>;
  findById(id: mongoose.Schema.Types.ObjectId): Promise<RentalOffer | null>;
  update(document: Partial<RentalOffer>): Promise<void>;
}
