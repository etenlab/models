import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { nanoid } from 'nanoid';

import { File } from '../file/file.entity';

import { Post } from './post.entity';

import { TableNameConst } from '../../constants/table-name.constant';

@ObjectType()
@Entity({ name: TableNameConst.RELATIONSHIP_POST_FILES })
export class RelationshipPostFile {
  constructor() {
    this.relationship_post_file_id = this.relationship_post_file_id || nanoid();
  }

  // We use constructor assigment in order to custom id (nanoid)
  // be created upon entity creation(so we can use it while building relations before entity instance  was saved)
  // We don't want to use @BeforeIsert() to set up id because we dont want id to be changed.
  @Field()
  @PrimaryColumn({
    type: 'varchar',
    length: 21,
  })
  relationship_post_file_id!: string;

  @Field()
  @Column({ type: 'varchar', length: 21 })
  post_id!: string;

  @Column()
  file_id!: number;

  @ManyToOne(() => Post, (post) => post.post_id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @Field(() => File)
  @OneToOne(() => File, (file) => file.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'file_id',
  })
  file!: File;
}
