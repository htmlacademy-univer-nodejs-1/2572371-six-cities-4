import { UserDto } from './userDto.js';
import { IsString, IsInt, Min, Max, Length } from 'class-validator';

export interface Comment {
  id: string;
  text: string;
  publicationDate: string | undefined;
  rating: number;
  user: UserDto;
}

export class CreateCommentDto {
  @IsString()
  @Length(5, 1024)
  public text!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  public rating!: number;
}
