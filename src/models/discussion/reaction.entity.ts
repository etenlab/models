import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Post } from './post.entity';
import type { User } from '../user/user.entity';

@Entity({ name: 'reactions' })
export class Reaction {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id!: number;

  @ManyToOne('Post', (post: Post) => post.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post!: Relation<Post>;

  @Column('bigint')
  post_id!: number;

  @Column('bigint')
  user_id!: number;

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
