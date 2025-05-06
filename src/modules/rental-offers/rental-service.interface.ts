import {DatabaseOperationsInterface} from '../../db/database-operations.interface.js';
import {RentalOffer} from './rental-offer.dbo.js';

export interface RentalServiceInterface extends DatabaseOperationsInterface<RentalOffer>
{

}
