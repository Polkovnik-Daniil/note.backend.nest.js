import { Book } from '@models/book';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('readers')
export class Reader {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', unique: true })
  name: string;

  @Column({
    name: 'creation_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date;
  
  @Column({ name: 'edit_date', type: 'timestamp', nullable: true })
  editDate: Date | null;

  @ManyToMany(() => Book, (book) => book.readers)
  books: Book[];
}
