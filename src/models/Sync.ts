import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'sync_sessions' })
export class SyncSession {
  @PrimaryGeneratedColumn({ type: 'int', name: 'sync_session' })
  id!: number;

  @Column('int')
  syncFrom!: number;

  @Column('int')
  syncTo!: number;

  @Column('datetime')
  createdAt!: Date;

  @Column('boolean')
  completed!: boolean;

  @Column('text', { nullable: true })
  error?: string;
}
