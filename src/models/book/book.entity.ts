import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

  //TODO: add new fields
}
