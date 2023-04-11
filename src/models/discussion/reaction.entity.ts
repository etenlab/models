import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'reactions' })
export class Reaction {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id!: number;

  @ManyToOne(() => Post, (post) => post.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @Column('bigint')
  post_id!: number;

  @Column('bigint')
  user_id!: number;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;

  @Column('varchar')
  content!: string;
}
