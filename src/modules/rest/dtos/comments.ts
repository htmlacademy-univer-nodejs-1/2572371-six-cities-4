import { UserDto } from './userDto.js';

export interface Comment {
  id: string;
  text: string;
  publicationDate: string | undefined;
  rating: number;
  user: UserDto;
}

export interface CreateCommentDto {
  text: string;
  rating: number;
}
