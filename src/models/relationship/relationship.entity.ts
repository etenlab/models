import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { nanoid } from 'nanoid';
import { Node } from '../node/node.entity';
import { RelationshipType } from './relationship-type.entity';
import { RelationshipPropertyKey } from './relationship-property-key.entity';
import { Syncable } from '../Syncable';

import { TableNameConst } from '@/constants/table-name.constant';

@Entity({ name: TableNameConst.RELATIONSHIPS })
export class Relationship extends Syncable {
  @PrimaryColumn('uuid', { type: 'varchar', length: 21 })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('text', { nullable: true })
  readonly relationship_id!: string | null;

  @ManyToOne(() => RelationshipType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'relationship_type', referencedColumnName: 'type_name' })
  relationshipType!: RelationshipType;

  @Column('varchar')
  relationship_type!: string;

  @ManyToOne(() => Node, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'from_node_id', referencedColumnName: 'id' })
  fromNode!: Node;

  @Column('varchar')
  from_node_id!: string;

  @ManyToOne(() => Node, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'to_node_id', referencedColumnName: 'id' })
  toNode!: Node;

  @Column('varchar')
  to_node_id!: string;

  @OneToMany(
    () => RelationshipPropertyKey,
    (relationship_property_key) => relationship_property_key.relationship,
  )
  propertyKeys!: RelationshipPropertyKey[];
}
