import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { nanoid } from 'nanoid';
import type { Node } from './node.entity';
import { NodePropertyValue } from './node-property-value.entity';
import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.NODE_PROPERTY_KEYS })
export class NodePropertyKey extends Syncable {
  @PrimaryColumn('uuid', { type: 'varchar', length: 21, unique: true })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('text', { nullable: true })
  readonly node_property_key_id!: string | null; // TODO: chack if needed an delete

  @Column('varchar')
  property_key!: string; //TODO: naming

  @ManyToOne('Node', (node: Node) => node.propertyKeys, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'node_id', referencedColumnName: 'id' })
  node!: Relation<Node>;

  @Column('varchar')
  node_id!: string; //TODO: naming

  @OneToOne(
    () => NodePropertyValue,
    (nodePropertyValue) => nodePropertyValue.propertyKey,
  )
  propertyValue!: NodePropertyValue;

  // from cpg-server

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
