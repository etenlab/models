import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { nanoid } from 'nanoid';

import { Post } from './post.entity';
import { User } from '../user/user.entity';

import { TableNameConst } from '../../constants/table-name.constant';

@ObjectType()
@Entity({ name: TableNameConst.REACTIONS })
@Unique(['user_id', 'content', 'post_id'])
export class Reaction {
  constructor() {
    this.reaction_id = this.reaction_id || nanoid();
  }

  // We use constructor assigment in order to custom id (nanoid)
  // be created upon entity creation(so we can use it while building relations before entity instance  was saved)
  // We don't want to use @BeforeIsert() to set up id because we dont want id to be changed.
  @Field()
  @PrimaryColumn({
    type: 'varchar',
    length: 21,
  })
  reaction_id!: string;

  @Field()
  @Column({ type: 'varchar', length: 21 })
  post_id!: string;

  @Field()
  @Column({ type: 'varchar', length: 21 })
  user_id!: string;

  @Field()
  @Column('varchar')
  content!: string;

  @ManyToOne(() => Post, (post) => post.post_id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.user_id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;
}
