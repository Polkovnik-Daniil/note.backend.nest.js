import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('book_author')
export class BookAuthor {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  //TODO: add new fields
}
