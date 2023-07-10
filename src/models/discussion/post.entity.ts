import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  BeforeInsert,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { nanoid } from 'nanoid';

import { Discussion } from './discussion.entity';
import { Reaction } from './reaction.entity';
import { RelationshipPostFile } from './relationship-post-file.entity';
import { User } from '../user/user.entity';

import { TableNameConst } from '../../constants/table-name.constant';

@ObjectType()
@Entity({ name: TableNameConst.POSTS })
export class Post {
  constructor() {
    this.post_id = this.post_id || nanoid();
  }

  // We use constructor assigment in order to custom id (nanoid)
  // be created upon entity creation(so we can use it while building relations before entity instance  was saved)
  // We don't want to use @BeforeIsert() to set up id because we dont want id to be changed.
  @Field()
  @PrimaryColumn({
    type: 'varchar',
    length: 21,
  })
  post_id!: string;

  @Field()
  @Column({ type: 'varchar', length: 21 })
  discussion_id!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 21, nullable: true })
  reply_id?: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 21 })
  user_id!: string;

  @Field()
  @Column('varchar')
  quill_text!: string;

  @Field()
  @Column('varchar')
  plain_text!: string;

  @Column({ type: 'varchar', default: 'simple' })
  @Field(() => String, { nullable: false, defaultValue: 'simple' })
  postgres_language!: string;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ type: 'boolean', default: false })
  is_edited!: boolean;

  @BeforeInsert()
  setCreateDate(): void {
    this.created_at = new Date();
  }

  @CreateDateColumn()
  @Field(() => Date)
  created_at!: Date;

  @ManyToOne(() => Discussion, (discussion) => discussion.discussion_id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'discussion_id' })
  discussion?: Discussion;

  @Field(() => [Reaction], { nullable: 'items' })
  @OneToMany(() => Reaction, (reaction) => reaction.post)
  reactions!: Reaction[];

  @Field(() => [RelationshipPostFile], { nullable: 'items' })
  @OneToMany(
    () => RelationshipPostFile,
    (relationshipPostFile) => relationshipPostFile.post,
  )
  files!: RelationshipPostFile[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.user_id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.post_id, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  @JoinColumn({
    name: 'reply_id',
  })
  reply?: Post;
}
