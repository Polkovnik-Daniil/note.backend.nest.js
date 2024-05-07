import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('book_author')
export class BookAuthor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'creation_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date;

  @Column({ name: 'edit_date', type: 'timestamp', nullable: true })
  editDate: Date | null;
  
  @Column({name: 'book_id', type: 'varchar', length: 36})
  book_id: string;
  
  @Column({name: 'author_id', type: 'varchar', length: 36})
  author_id: string;
  //TODO: add new fields
}
