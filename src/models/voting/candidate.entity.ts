import {
  Column,
  Entity,
  PrimaryColumn,
  JoinColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { nanoid } from 'nanoid';

import { Election } from './election.entity';
import { Vote } from './vote.entity';

import { Syncable } from '../Syncable';

import { TableNameConst } from '@/constants/table-name.constant';

@Entity({ name: TableNameConst.CANDIDATES })
@Index(['election_id', 'candidate_ref'], { unique: true })
export class Candidate extends Syncable {
  @PrimaryColumn('uuid', { type: 'varchar', length: 21, unique: true })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  // TODO: looks redundant, check and delete
  @Column('text', { nullable: true })
  readonly candidate_id!: string | null;

  @ManyToOne(() => Election, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'election_id', referencedColumnName: 'id' })
  election!: Election;

  @Column('varchar')
  election_id!: string;

  @Column({ type: 'varchar' })
  candidate_ref!: string;

  @OneToMany(() => Vote, (vote) => vote.candidate)
  votes!: Vote[];
}
