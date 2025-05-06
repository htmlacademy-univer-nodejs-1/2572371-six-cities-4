import {RentalServiceInterface} from './rental-service.interface.js';
import {RentalOffer, RentalOfferDbo} from './rental-offer.dbo.js';

export class RentalService implements RentalServiceInterface {
  async find(query: Partial<RentalOffer>): Promise<RentalOffer[]> {
    return RentalOfferDbo.find(query).exec();
  }

  async create(document: RentalOffer): Promise<RentalOffer> {
    const rentalOffer = new RentalOfferDbo(document);
    return rentalOffer.save();
  }
}
