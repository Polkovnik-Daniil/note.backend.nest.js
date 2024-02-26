import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', unique: true })
  name: string;
}
