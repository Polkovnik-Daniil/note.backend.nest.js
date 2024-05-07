import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateGenreDto } from './create.genre.dto';

export class UpdateGenreDto extends CreateGenreDto {
  id: string;
}
