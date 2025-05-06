import { UserType } from './cities.js';

export interface UserDto {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  type: UserType;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  type: UserType;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserDto;
}
