import { Author } from '@models/author';
import { Genre } from '@models/genre';
import { Reader } from '@models/reader';

export class CreateBookDto {
  title: string;
  releaseDate: Date;
  numberOfBooks: number;
  numberOfPage: number;
  creationDate: Date;
  readers: Reader[];
  authors: Author[];
  genres: Genre[];
}
