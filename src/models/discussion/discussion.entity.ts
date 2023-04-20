import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.DISCUSSIONS })
export class Discussion {
  @PrimaryGeneratedColumn('increment', {
    type: 'integer',
    name: 'discussion_id',
  })
  id!: number;

  @Column('varchar', { name: 'table_name' })
  tableName!: string;

  @Column('int', { nullable: true })
  row!: number;

  @OneToMany(() => Post, (post) => post.discussion)
  posts!: Post[];

  // from cpg-server

  @Column('integer', { name: 'app', default: () => '0' })
  app?: number;

  @Column('integer', { name: 'org', default: () => '0' })
  org?: number;
}
