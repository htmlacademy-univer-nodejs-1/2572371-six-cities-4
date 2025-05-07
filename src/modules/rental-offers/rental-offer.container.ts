import { ContainerModule } from 'inversify';
import { RentalServiceInterface } from './rental-service.interface.js';
import { RentalService } from './rental-service.js';
import { RentalOfferDbo } from './rental-offer.dbo.js';

export function createOfferContainer(): ContainerModule {
  return new ContainerModule((bind) => {
    bind.bind<RentalServiceInterface>('RentalService').to(RentalService);
    bind.bind(Symbol.for('RentalOfferModel')).toConstantValue(RentalOfferDbo);
  });
}
