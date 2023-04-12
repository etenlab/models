import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { TableNameConst } from '../../constants/table-name.constant';
import type { RelationshipPostFile } from '../discussion/relationship-post-file.entity';

@Entity({ name: TableNameConst.FILES })
export class File {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id!: number;

  @Column('varchar', { name: 'file_name' })
  fileName!: string;

  @Column('bigint', { name: 'file_size' })
  fileSize!: number;

  @Column('varchar', { name: 'file_type' })
  fileType!: string;

  @Column('varchar', { name: 'file_url' })
  fileUrl!: string;

  @OneToOne(
    'RelationshipPostFile',
    (relationshipPostFile: RelationshipPostFile) => relationshipPostFile.file,
  )
  relationshipPostFile!: Relation<RelationshipPostFile>;
}
