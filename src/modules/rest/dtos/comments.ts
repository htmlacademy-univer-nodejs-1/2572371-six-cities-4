import { User } from './user.js';

export interface Comment {
  id: string;
  text: string;
  publicationDate: string;
  rating: number;
  user: User;
}

export interface CreateCommentDto {
  text: string;
  rating: number;
}
