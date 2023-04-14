import {
  Column,
  Entity,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Index,
  Relation,
} from 'typeorm';
import { nanoid } from 'nanoid';

import type { Election } from './election.entity';
import { Vote } from './vote.entity';

import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.CANDIDATES })
@Index(['election_id', 'candidate_ref'], { unique: true })
export class Candidate extends Syncable {
  constructor() {
    super();
    this.id = this.id || nanoid();
  }

  // We use constructor assigment in order to custom id (nanoid)
  // be created upon entity creation(so we can use it while building relations before entity instance  was saved)
  // We don't want to use @BeforeIsert() to set up id because we dont want id to be changed.
  @PrimaryColumn({
    type: 'varchar',
    length: 21,
  })
  id!: string;

  // @Column('text', { nullable: true }) // TODO: check is it needed an delete
  // readonly candidate_id!: string | null;

  @ManyToOne('Election', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'election_id', referencedColumnName: 'id' })
  election!: Relation<Election>;

  @Column('varchar')
  election_id!: string;

  @Column({ type: 'varchar' })
  candidate_ref!: string;

  @OneToMany(() => Vote, (vote) => vote.candidate)
  votes!: Vote[];
}
