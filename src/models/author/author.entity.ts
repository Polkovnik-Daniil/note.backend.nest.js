import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '..';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name_first', type: 'varchar' })
  nameFirst: string;

  @Column({ name: 'name_last', type: 'varchar' })
  nameLast: string;

  @Column({ name: 'birth_date', type: 'timestamp', nullable: true })
  birthDate: Date;

  @Column({
    name: 'creation_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date;

  @Column({ name: 'edit_date', type: 'timestamp', nullable: true })
  editDate: Date | null;

  @ManyToMany(() => Book, (books) => books.authors)
  books: Book[];
}
