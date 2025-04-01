import {RentalOffer} from '../../db/rentalOfferDbo.js';
import fs from 'node:fs';
import axios from 'axios';

export async function generateData(n: number, url: string): Promise<RentalOffer[]> {
  const generatedData: RentalOffer[] = [];

  for (let i = 0; i < n; i++) {
    const response = await axios.get<RentalOffer>(`${url}/${i % 8}`);
    const data = response.data;
    data.publishDate = new Date(data.publishDate);
    data.price = Math.floor(Math.random() * 1000);
    generatedData.push(data);
  }

  return generatedData;
}

export function saveDataToFile(data: RentalOffer[], filepath: string) {
  const tsvData = data.map((offer) => [
    offer.name,
    offer.description,
    offer.publishDate.toISOString(),
    offer.city,
    offer.previewImage,
    offer.photos.join(','),
    offer.isPremium,
    offer.isFavorite,
    offer.rating,
    offer.type,
    offer.rooms,
    offer.guests,
    offer.price,
    offer.amenities.join(','),
    offer.author,
    offer.commentsCount,
    [offer.coordinates.lat,offer.coordinates.lng].join(',')
  ].join('\t')).join('\n');

  fs.writeFileSync(filepath, tsvData);
}
