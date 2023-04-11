import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity({ name: 'discussions' })
export class Discussion {
  @PrimaryGeneratedColumn('increment', { type: 'integer', name: 'id' })
  id!: number;

  @Column('varchar', { nullable: true })
  table_name!: string;

  @Column('int', { nullable: true })
  row!: number;

  @OneToMany(() => Post, (post) => post.discussion)
  posts!: Post[];
}
