import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Entity,
  Relation,
} from 'typeorm';
import type { Post } from './post.entity';
import type { File } from '../file/file.entity';

@Entity({ name: 'relationship_post_files' })
export class RelationshipPostFile {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id!: number;

  @Column('bigint')
  post_id!: number;

  @ManyToOne('Post', (post: Post) => post.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post!: Relation<Post>;

  @Column('bigint')
  file_id!: number;

  @OneToOne('File', (file: File) => file.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'file_id',
  })
  file!: Relation<File>;
}
