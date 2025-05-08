import { AmenityType, City, CityName, Coordinates, HousingType } from './cities.js';
import { UserDto } from './userDto.js';
import {
  IsString, Length, IsEnum, IsUrl, IsArray, ArrayMaxSize,
  ArrayMinSize, IsBoolean, IsNumber, Min, Max, IsOptional,
  ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';

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

export class CoordinatesDto implements Coordinates {
  @IsNumber()
    latitude!: number;

  @IsNumber()
    longitude!: number;
}

export class CreateOfferDto {
  @IsString()
    id!: string;

  @IsString()
  @Length(10, 100)
    title!: string;

  @IsString()
  @Length(20, 1024)
    description!: string;

  @IsEnum(CityName)
    city!: CityName;

  @IsUrl()
    previewImage!: string;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsUrl({}, { each: true })
    images!: string[];

  @IsBoolean()
    isPremium!: boolean;

  @IsEnum(HousingType)
    type!: HousingType;

  @IsNumber()
  @Min(1)
  @Max(8)
    bedrooms!: number;

  @IsNumber()
  @Min(1)
  @Max(10)
    maxAdults!: number;

  @IsNumber()
  @Min(100)
  @Max(100000)
    price!: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(AmenityType, { each: true })
    amenities!: AmenityType[];

  @ValidateNested()
  @Type(() => CoordinatesDto)
    coordinates!: CoordinatesDto;
}

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  @Length(10, 100)
    title?: string;

  @IsOptional()
  @IsString()
  @Length(20, 1024)
    description?: string;

  @IsOptional()
  @IsEnum(CityName)
    city?: CityName;

  @IsOptional()
  @IsUrl()
    previewImage?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsUrl({}, { each: true })
    images?: string[];

  @IsOptional()
  @IsBoolean()
    isPremium?: boolean;

  @IsOptional()
  @IsEnum(HousingType)
    type?: HousingType;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(8)
    bedrooms?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
    maxAdults?: number;

  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(100000)
    price?: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(AmenityType, { each: true })
    amenities?: AmenityType[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesDto)
    coordinates?: CoordinatesDto;
}
