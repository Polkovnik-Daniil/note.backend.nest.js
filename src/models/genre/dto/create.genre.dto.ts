import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class CreateGenreDto {
  name: string;
  editDate: Date | null;
}
