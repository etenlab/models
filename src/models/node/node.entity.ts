import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { nanoid } from 'nanoid';
import { NodeType } from './node-type.entity';
import { NodePropertyKey } from './node-property-key.entity';
import { Relationship } from '../relationship/relationship.entity';
import { Syncable } from '../Syncable';
import { NodeTypeConst } from '../../constants/graph.constant';

import { TableNameConst } from '@/constants/table-name.constant';

@Entity({ name: TableNameConst.NODES })
export class Node extends Syncable {
  @PrimaryColumn('uuid', { type: 'varchar', length: 21, unique: true })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('text', { nullable: true })
  readonly node_id!: string | null;

  @ManyToOne(() => NodeType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'node_type', referencedColumnName: 'type_name' })
  nodeType!: NodeType;

  @Column('varchar')
  node_type!: NodeTypeConst;

  @OneToMany(
    () => NodePropertyKey,
    (node_property_key) => node_property_key.node,
  )
  propertyKeys!: NodePropertyKey[];

  @OneToMany(() => Relationship, (relationship) => relationship.fromNode)
  toNodeRelationships: Relationship[] | undefined;

  @OneToMany(() => Relationship, (relationship) => relationship.toNode)
  fromNodeRelationships: Relationship[] | undefined;
}
