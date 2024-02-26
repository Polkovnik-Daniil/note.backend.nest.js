import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ name: 'creation_date', type: 'timestamp' })
  creationDate: Date;

  @Column({ name: 'edit_date', type: 'timestamp', nullable: true })
  editDate: Date | null;
}
