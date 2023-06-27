import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { nanoid } from 'nanoid';
import { NodeType } from './node-type.entity';
import { NodePropertyKey } from './node-property-key.entity';
import { Relationship } from '../relationship/relationship.entity';
import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';

// @Index('nodes_pkey', ['id'], { unique: true })
@Entity({ name: TableNameConst.NODES })
export class Node extends Syncable {
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
    name: 'node_id',
  })
  id!: string;

  // @Column('text', { nullable: true })
  // readonly node_id!: string | null; // TODO: check if is it needed an delete

  @ManyToOne(() => NodeType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'node_type', referencedColumnName: 'type_name' })
  nodeType!: NodeType;

  @Index()
  @Column('varchar')
  node_type!: string;

  @OneToMany(
    () => NodePropertyKey,
    (node_property_key) => node_property_key.node,
  )
  propertyKeys!: NodePropertyKey[];

  @OneToMany(() => Relationship, (relationship) => relationship.fromNode)
  toNodeRelationships: Relationship[] | undefined;

  @OneToMany(() => Relationship, (relationship) => relationship.toNode)
  fromNodeRelationships: Relationship[] | undefined;

  // from cpg-server

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}
