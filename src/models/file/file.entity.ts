import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import type { RelationshipPostFile } from '../discussion/relationship-post-file.entity';

import { TableNameConst } from '../../constants/table-name.constant';

@ObjectType()
@Entity({ name: TableNameConst.FILES })
export class File {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment', { type: 'integer', name: 'file_id' })
  id!: number;

  @Field()
  @Column('varchar', { name: 'file_name' })
  fileName!: string;

  @Field(() => Int)
  @Column('bigint', { name: 'file_size' })
  fileSize!: number;

  @Field()
  @Column('varchar', { name: 'file_type' })
  fileType!: string;

  @Field()
  @Column('varchar', { name: 'file_url' })
  fileUrl!: string;

  @Field()
  @Column('varchar', { name: 'file_hash' })
  fileHash!: string;

  @OneToOne(
    'RelationshipPostFile',
    (relationshipPostFile: RelationshipPostFile) => relationshipPostFile.file,
  )
  relationshipPostFile!: Relation<RelationshipPostFile>;
}
