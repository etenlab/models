import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { nanoid } from 'nanoid';
import type { Relation } from 'typeorm';
import type { NodePropertyKey } from './node-property-key.entity';
import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.NODE_PROPERTY_VALUES })
export class NodePropertyValue extends Syncable {
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
  // readonly node_property_value_id!: string | null; // TODO: chack if needed an delete

  @Column('varchar')
  property_value!: string; //TODO: naminig

  @OneToOne(
    'NodePropertyKey',
    (nodePropertyKey: NodePropertyKey) => nodePropertyKey.propertyValue,
  )
  @JoinColumn({
    name: 'node_property_key_id',
    referencedColumnName: 'id',
  })
  propertyKey!: Relation<NodePropertyKey>;

  @Column('varchar')
  node_property_key_id!: string; //TODO:naming

  // from cpg-server

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}
