import {
  Column,
  Entity,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { nanoid } from 'nanoid';

import { ElectionType } from './election-type.entity';
import { Candidate } from './candidate.entity';

import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';
import { ElectionTypeConst } from '../../constants/voting.constant';

@Entity({ name: TableNameConst.ELECTIONS })
@Index(['election_type', 'election_ref', 'ref_table_name'], { unique: true })
export class Election extends Syncable {
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
  // readonly election_id!: string | null; / TODO: check is it needed an delete

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
