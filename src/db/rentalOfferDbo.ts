import mongoose from 'mongoose';

const rentalOfferSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 10, maxlength: 100 },
  description: { type: String, required: true, minlength: 20, maxlength: 1024 },
  publishDate: { type: Date, required: true },
  city: { type: String, enum: ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург', 'Сочи'], required: true },
  previewImage: { type: String, required: true },
  photos: { type: [String], required: true },
  isPremium: { type: Boolean, required: true },
  isFavorite: { type: Boolean, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  type: { type: String, enum: ['apartment', 'house', 'room', 'hotel'], required: true },
  rooms: { type: Number, required: true, min: 1, max: 8 },
  guests: { type: Number, required: true, min: 1, max: 10 },
  price: { type: Number, required: true, min: 100, max: 100000 },
  amenities: { type: [String], required: true },
  author: { type: String, required: true },
  coordinates: { type: String, required: true },
});

export const RentalOfferDbo = mongoose.model('RentalOfferDbo', rentalOfferSchema);
