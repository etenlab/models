import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import type { Relation } from 'typeorm';
import type { User } from '../user/user.entity';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.REACTIONS })
export class Reaction {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id!: number;

  @ManyToOne('Post', (post: Post) => post.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post!: Relation<Post>;

  @Column('bigint', { name: 'post_id' })
  postId!: number;

  @Column('bigint', { name: 'user_id' })
  userId!: number;

  @ManyToOne('User', (user: User) => user.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user!: Relation<User>;

  @Column('varchar')
  content!: string;
}
