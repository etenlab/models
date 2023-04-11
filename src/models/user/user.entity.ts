import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id!: number;

  @Column({ type: 'varchar', unique: true, length: 255 })
  username!: string;

  @Column('varchar', { nullable: true })
  first_name?: string;

  @Column('varchar', { nullable: true })
  last_name?: string;
}
