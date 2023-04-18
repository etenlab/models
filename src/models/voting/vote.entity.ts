import {
  Column,
  Entity,
  PrimaryColumn,
  JoinColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { nanoid } from 'nanoid';

import type { Relation } from 'typeorm';
import type { Candidate } from './candidate.entity';

import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.VOTES })
@Index(['candidate_id', 'user_id'], { unique: true })
export class Vote extends Syncable {
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

  // @Column('text', { nullable: true })
  // readonly vote_id!: string | null; // TODO: check is it needed an delete

  @ManyToOne('Candidate', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'election_id', referencedColumnName: 'id' })
  candidate!: Relation<Candidate>;

  @Column({ type: 'varchar' })
  candidate_id!: string;

  @Column({ type: 'varchar' })
  user_id!: string;

  @Column({ type: 'boolean' })
  vote!: boolean;
}
