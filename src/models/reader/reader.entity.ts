import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('readers')
export class Reader {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', unique: true })
  name: string;
}
