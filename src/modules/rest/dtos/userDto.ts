import {UserType} from './cities.js';
import {IsString, IsEmail, IsOptional, Length, Matches} from 'class-validator';

export interface UserDto {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  type: UserType;
}

export class CreateUserDto {
  id!: string;

  @IsString()
  @Length(1, 15, {message: 'Name must be between 1 and 15 characters'})
    name!: string;

  @IsEmail({}, {message: 'Invalid email address'})
    email!: string;

  @IsString()
  @Length(6, 12, {message: 'Password must be between 6 and 12 characters'})
    password!: string;

  type!: UserType;

  @IsOptional()
  @Matches(/\.(jpg|jpeg|png)$/, {message: 'Avatar must be in .jpg, .jpeg or .png format'})
    avatarUrl?: string;
}

export class LoginUserDto {
  @IsEmail({}, {message: 'Invalid email address'})
    email!: string;

  @IsString()
  @Length(6, 12, {message: 'Password must be between 6 and 12 characters'})
    password!: string;
}

export interface AuthResponse {
  token: string;
  user: UserDto;
}
