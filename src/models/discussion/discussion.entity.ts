import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity({ name: 'discussions' })
export class Discussion {
  @PrimaryGeneratedColumn('increment', { type: 'integer', name: 'id' })
  id!: number;

  // @Column('varchar', { nullable: true })
  // table_name!: string;
  @Column('char varying', { name: 'table_name' })
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
