import { Author } from '@models/author';
import { Genre } from '@models/genre';
import { Reader } from '@models/reader';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', unique: true })
  title: string;

  @Column({ name: 'release_date', type: 'timestamp', unique: true })
  releaseDate: Date;

  @Column({ name: 'number_of_books', type: 'integer', unique: true })
  numberOfBooks: number;

  @Column({ name: 'number_of_pages', type: 'integer', unique: true })
  numberOfPage: number;

  @Column({
    name: 'creation_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date;

  @Column({ name: 'edit_date', type: 'timestamp', nullable: true })
  editDate: Date | null;
  // TODO: add new fields

  @ManyToMany(() => Reader, (reader) => reader.books)
  readers: Reader[];

  @ManyToMany(() => Author, (author) => author.books)
  authors: Author[];

  @ManyToMany(() => Genre, (genre) => genre.books)
  genres: Genre[];
}
