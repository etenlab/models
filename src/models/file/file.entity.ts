import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { TableNameConst } from '../../constants/table-name.constant';
import type { RelationshipPostFile } from '../discussion/relationship-post-file.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity({ name: TableNameConst.FILES })
@ObjectType()
export class File {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  @Field(() => Int)
  id!: number;

  @Column('varchar', { name: 'file_name' })
  @Field(() => String)
  fileName!: string;

  @Column('bigint', { name: 'file_size' })
  @Field(() => Int)
  fileSize!: number;

  @Column('varchar', { name: 'file_type' })
  @Field(() => String)
  fileType!: string;

  @Column('varchar', { name: 'file_url' })
  @Field(() => String)
  fileUrl!: string;

  @OneToOne(
    'RelationshipPostFile',
    (relationshipPostFile: RelationshipPostFile) => relationshipPostFile.file,
  )
  relationshipPostFile!: Relation<RelationshipPostFile>;
}
