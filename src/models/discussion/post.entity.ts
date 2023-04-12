import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import type { Discussion } from './discussion.entity';
import { Reaction } from './reaction.entity';
import { RelationshipPostFile } from './relationship-post-file.entity';
import type { User } from '../user/user.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id!: number;

  @Column('bigint')
  discussion_id!: number;

  @ManyToOne('Discussion', (discussion: Discussion) => discussion.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'discussion_id' })
  discussion!: Relation<Discussion>;

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
  quill_text!: string;

  @Column('varchar')
  plain_text!: string;

  @Column({ default: false, type: 'tinyint' })
  is_edited!: boolean;

  @Column({ type: 'bigint', nullable: true })
  reply_id?: number;

  @ManyToOne(() => Post, (post) => post.id, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  @JoinColumn({
    name: 'reply_id',
  })
  reply?: Post;

  @CreateDateColumn()
  created_at?: Date;

  @OneToMany(() => Reaction, (reaction) => reaction.post)
  reactions?: Reaction[];

  @OneToMany(() => RelationshipPostFile, (file) => file.post)
  files?: RelationshipPostFile[];
}
