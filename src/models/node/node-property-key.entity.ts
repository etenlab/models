import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { nanoid } from 'nanoid';
import { Node } from './node.entity';
import { NodePropertyValue } from './node-property-value.entity';
import { Syncable } from '../Syncable';

import { TableNameConst } from '@/constants/table-name.constant';

@Entity({ name: TableNameConst.NODE_PROPERTY_KEYS })
export class NodePropertyKey extends Syncable {
  @PrimaryColumn('uuid', { type: 'varchar', length: 21, unique: true })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('text', { nullable: true })
  readonly node_property_key_id!: string | null;

  @Column('varchar')
  property_key!: string;

  @ManyToOne(() => Node, (node) => node.propertyKeys, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'node_id', referencedColumnName: 'id' })
  node!: Node;

  @Column('varchar')
  node_id!: string;

  @OneToOne(
    () => NodePropertyValue,
    (nodePropertyValue) => nodePropertyValue.propertyKey,
  )
  propertyValue!: NodePropertyValue;
}
