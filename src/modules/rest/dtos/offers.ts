import { AmenityType, City, CityName, Coordinates, HousingType } from './cities.js';
import { UserDto } from './userDto.js';

export interface OfferShort {
  id: string;
  title: string;
  price: number;
  type: HousingType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  city: City;
  publicationDate: string;
  commentsCount: number;
}

export interface Offer extends OfferShort {
  description: string;
  images: string[];
  bedrooms: number;
  maxAdults: number;
  amenities: AmenityType[];
  host: UserDto;
  coordinates: Coordinates;
}

export interface CreateOfferDto {
  id: string;
  title: string;
  description: string;
  city: CityName;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  type: HousingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  amenities: AmenityType[];
  coordinates: Coordinates;
}

export interface UpdateOfferDto {
  title?: string;
  description?: string;
  city?: CityName;
  previewImage?: string;
  images?: string[];
  isPremium?: boolean;
  type?: HousingType;
  bedrooms?: number;
  maxAdults?: number;
  price?: number;
  amenities?: AmenityType[];
  coordinates?: Coordinates;
}
