import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { EGgender } from './enum.gender';
import { Role } from '..';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  hashPassword: string;

  @Column({ name: 'name_first', type: 'varchar' })
  nameFirst: string;

  @Column({ name: 'name_last', type: 'varchar' })
  nameLast: string;

  @Column({ name: 'birth_date', type: 'timestamp', nullable: true })
  birthDate: Date;

  @Column({ name: 'gender', type: 'enum', enum: EGgender, nullable: true })
  gender: EGgender | null;

  @Column({ name: 'is_locked', type: 'boolean', default: false })
  isLocked: boolean;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Column({
    name: 'creation_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date;

  @Column({ name: 'edit_date', type: 'timestamp', nullable: true })
  editDate: Date | null;
}
