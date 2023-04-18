import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
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
  })
  id!: string;

  // @Column('text', { nullable: true })
  // readonly node_property_key_id!: string | null; // TODO: check if needed and delete

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
  updated_at?: Date;
}
