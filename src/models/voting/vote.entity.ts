import {
  Column,
  Entity,
  PrimaryColumn,
  JoinColumn,
  Index,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import { nanoid } from 'nanoid';

import { Candidate } from './candidate.entity';

import { Syncable } from '../Syncable';

import { TableNameConst } from '@/constants/table-name.constant';

@Entity({ name: TableNameConst.VOTES })
@Index(['candidate_id', 'user_id'], { unique: true })
export class Vote extends Syncable {
  @PrimaryColumn('uuid', { type: 'varchar', length: 21, unique: true })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('text', { nullable: true })
  readonly vote_id!: string | null;

  @ManyToOne(() => Candidate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'election_id', referencedColumnName: 'id' })
  candidate!: Candidate;

  @Column({ type: 'varchar' })
  candidate_id!: string;

  @Column({ type: 'varchar' })
  user_id!: string;

  @Column({ type: 'boolean' })
  vote!: boolean;
}
