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

import { ElectionType } from './election-type.entity';
import { Candidate } from './candidate.entity';

import { ElectionTypeConst } from '@/constants/voting.constant';

import { Syncable } from '../Syncable';

import { TableNameConst } from '@/constants/table-name.constant';

@Entity({ name: TableNameConst.ELECTIONS })
@Index(['election_type', 'election_ref', 'ref_table_name'], { unique: true })
export class Election extends Syncable {
  @PrimaryColumn('uuid', { type: 'varchar', length: 21, unique: true })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('text', { nullable: true })
  readonly election_id!: string | null;

  @ManyToOne(() => ElectionType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'election_type', referencedColumnName: 'type_name' })
  electionType!: ElectionTypeConst;

  @Column('varchar')
  election_type!: ElectionTypeConst;

  @Column({ type: 'varchar' })
  election_ref!: string;

  @Column({ type: 'varchar' })
  ref_table_name!: string;

  @Column({ type: 'varchar' })
  candidate_ref_table_name!: string;

  @OneToMany(() => Candidate, (candidate) => candidate.election)
  candidates!: Candidate[];
}
