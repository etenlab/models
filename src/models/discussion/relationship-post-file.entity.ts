import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Entity,
} from 'typeorm';
import type { Relation } from 'typeorm';
import type { Post } from './post.entity';
import type { File } from '../file/file.entity';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.RELATIONSHIP_POST_FILES })
export class RelationshipPostFile {
  @PrimaryGeneratedColumn('increment', {
    type: 'integer',
    name: 'relationship_post_files_id',
  })
  id!: number;

  @Column('bigint', { name: 'post_id' })
  postId!: number;

  @ManyToOne('Post', (post: Post) => post.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post!: Relation<Post>;

  @Column('bigint', { name: 'file_id' })
  fileId!: number;

  @OneToOne('File', (file: File) => file.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'file_id',
  })
  file!: Relation<File>;
}
