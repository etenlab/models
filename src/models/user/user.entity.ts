import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { nanoid } from 'nanoid';

import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';
@Entity(TableNameConst.USERS)
export class User extends Syncable {
  constructor() {
    super();
    this.id = this.id || nanoid();
  }

  // We use constructor assigment in order to custom id (nanoid)
  // be created upon entity creation(so we can use it while building relations before entity instance  was saved)
  // We don't want to use @BeforeIsert() to set up id because we dont want id to be changed.
  @PrimaryColumn({
    type: 'varchar',
    length: 21,
    name: 'user_id',
  })
  id!: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  username!: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  email!: string;

  @Column('varchar', { nullable: true })
  first_name?: string;

  @Column('varchar', { nullable: true })
  last_name?: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}
