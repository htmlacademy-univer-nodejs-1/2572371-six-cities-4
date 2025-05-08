import {RentalServiceInterface} from './rental-service.interface.js';
import {RentalOffer, RentalOfferDbo} from './rental-offer.dbo.js';
import mongoose from 'mongoose';

export class RentalService implements RentalServiceInterface {
  async updateImage(id: mongoose.Types.ObjectId, image: string): Promise<void> {
    await RentalOfferDbo.updateOne({_id: id}, {image}).exec();
  }

  async addPhoto(id: mongoose.Types.ObjectId, image: string): Promise<void> {
    await RentalOfferDbo.updateOne({_id: id}, {$push: {photos: image}}).exec();
  }

  async findById(id: mongoose.Types.ObjectId): Promise<RentalOffer | null> {
    return await RentalOfferDbo.findById(id).exec();
  }

  async findByIds(ids: mongoose.Types.ObjectId[]): Promise<RentalOffer[]> {
    return await RentalOfferDbo.find({_id: {$in: ids}}).exec();
  }

  async find(query: Partial<RentalOffer>): Promise<RentalOffer[]> {
    return RentalOfferDbo.find(query).exec();
  }

  async create(document: RentalOffer): Promise<RentalOffer> {
    const rentalOffer = new RentalOfferDbo(document);
    return rentalOffer.save();
  }

  async deleteById(id: mongoose.Types.ObjectId): Promise<void> {
    await RentalOfferDbo.deleteOne({_id: id}).exec();
  }

  async update(document: RentalOffer): Promise<void> {
    await RentalOfferDbo.updateOne({_id: document.id}, document).exec();
  }
}
