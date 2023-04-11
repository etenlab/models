import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Entity,
} from 'typeorm';
import { Post } from './post.entity';
import { File } from '../file/file.entity';

@Entity({ name: 'relationship_post_files' })
export class RelationshipPostFile {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id!: number;

  @Column('bigint')
  post_id!: number;

  @ManyToOne(() => Post, (post) => post.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @Column('bigint')
  file_id!: number;

  @OneToOne(() => File, (file) => file.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'file_id',
  })
  file!: File;
}
