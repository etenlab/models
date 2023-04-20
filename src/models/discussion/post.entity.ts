import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import type { Discussion } from './discussion.entity';
import { Reaction } from './reaction.entity';
import { RelationshipPostFile } from './relationship-post-file.entity';
import type { User } from '../user/user.entity';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.POSTS })
export class Post {
  @PrimaryGeneratedColumn('increment', { type: 'integer', name: 'post_id' })
  id!: number;

  @Column('bigint', { name: 'discussion_id' })
  discussionId!: number;

  @ManyToOne('Discussion', (discussion: Discussion) => discussion.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'discussion_id' })
  discussion!: Relation<Discussion>;

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

  @Column('varchar', { name: 'quill_text' })
  quillText!: string;

  @Column('varchar', { name: 'plain_text' })
  plainText!: string;

  @Column({ default: false, type: 'boolean' })
  isEdited!: boolean;

  @Column({ type: 'bigint', nullable: true })
  replyId?: number;

  @ManyToOne(() => Post, (post) => post.id, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  @JoinColumn({
    name: 'reply_id',
  })
  reply?: Post;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @OneToMany(() => Reaction, (reaction) => reaction.post)
  reactions?: Reaction[];

  @OneToMany(() => RelationshipPostFile, (file) => file.post)
  files?: RelationshipPostFile[];

  // form cpg-server
  @Column('varchar', { name: 'postgres_language' })
  postgresLanguage!: string;
}
