import { Column } from 'typeorm';

export class Syncable {
  @Column({ default: 0, type: 'bigint' })
  sync_layer!: number;
}
