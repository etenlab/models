import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id!: number;

  @Column('varchar')
  file_name!: string;

  @Column('bigint')
  file_size!: number;

  @Column('varchar')
  file_type!: string;

  @Column('varchar')
  file_url!: string;
}
