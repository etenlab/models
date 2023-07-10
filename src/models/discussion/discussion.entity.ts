import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { nanoid } from 'nanoid';

import { Post } from './post.entity';

import { TableNameConst } from '../../constants/table-name.constant';

@ObjectType()
@Entity({ name: TableNameConst.DISCUSSIONS })
export class Discussion {
  constructor() {
    this.discussion_id = this.discussion_id || nanoid();
  }

  // We use constructor assigment in order to custom id (nanoid)
  // be created upon entity creation(so we can use it while building relations before entity instance  was saved)
  // We don't want to use @BeforeIsert() to set up id because we dont want id to be changed.
  @Field()
  @PrimaryColumn({
    type: 'varchar',
    length: 21,
  })
  discussion_id!: string;

  @Field()
  @Column('varchar')
  table_name!: string;

  @Field()
  @Column('varchar', { nullable: true })
  row_id!: string;

  @Field(() => [Post], { nullable: 'items' })
  @OneToMany(() => Post, (post) => post.discussion)
  posts!: Post[];
}
