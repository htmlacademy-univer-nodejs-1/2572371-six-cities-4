import { UserDto } from './userDto.js';

export interface Comment {
  id: string;
  text: string;
  publicationDate: string;
  rating: number;
  user: UserDto;
}

export interface CreateCommentDto {
  text: string;
  rating: number;
}
