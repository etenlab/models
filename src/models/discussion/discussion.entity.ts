import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { nanoid } from 'nanoid';
import { Post } from './post.entity';
import { TableNameConst } from '../../constants/table-name.constant';
import { Syncable } from '../Syncable';

@Entity({ name: TableNameConst.DISCUSSIONS })
export class Discussion extends Syncable {
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
    name: 'discussion_id',
  })
  id!: string;

  @Column('varchar', { name: 'table_name' })
  tableName!: string;

  @Column('varchar', { nullable: true })
  row!: string;

  @OneToMany(() => Post, (post) => post.discussion)
  posts!: Post[];

  // from cpg-server

  @Column('integer', { name: 'app', default: () => '0' })
  app?: number;

  @Column('integer', { name: 'org', default: () => '0' })
  org?: number;
}
