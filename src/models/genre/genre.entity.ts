import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', unique: true })
  name: string;
}
