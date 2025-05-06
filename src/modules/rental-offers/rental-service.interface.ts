import {DatabaseOperationsInterface} from '../../db/database-operations.interface.js';
import {RentalOffer} from './rental-offer.dbo.js';
import mongoose from 'mongoose';

export interface RentalServiceInterface extends DatabaseOperationsInterface<RentalOffer> {
  deleteById(id: mongoose.Schema.Types.ObjectId): Promise<void>;

  update(document: Partial<RentalOffer>): Promise<void>;
}
