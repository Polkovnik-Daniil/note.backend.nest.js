import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('book_reader')
export class BookReader {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'book_id', type: 'uuid', length: 36 })
  bookId: string;

  @Column({ name: 'reader_id', type: 'uuid', length: 36 })
  readerId: string;

  @Column({ name: 'user_id', type: 'uuid', length: 36 })
  userId: string;

  @Column({ name: 'date_of_issue_of_the_book', type: 'timestamp' })
  dateOfIssueOfTheBook: Date;

  @Column({ name: 'date_of_book_acceptance', type: 'timestamp' })
  dateOfBookAcceptance: Date;
}
