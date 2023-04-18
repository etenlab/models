import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { nanoid } from 'nanoid';
import type { Node } from '../node/node.entity';
import { RelationshipType } from './relationship-type.entity';
import { RelationshipPropertyKey } from './relationship-property-key.entity';
import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.RELATIONSHIPS })
export class Relationship extends Syncable {
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
  // readonly relationship_id!: string | null; // TODO: check is it needed an delete

  @ManyToOne(() => RelationshipType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'relationship_type', referencedColumnName: 'type_name' })
  relationshipType!: RelationshipType;

  @Column('varchar')
  relationship_type!: string; //TODO:naming

  @ManyToOne('Node', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'from_node_id', referencedColumnName: 'id' })
  fromNode!: Relation<Node>;

  @Column('varchar')
  from_node_id!: string; //TODO:naming

  @ManyToOne('Node', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'to_node_id', referencedColumnName: 'id' })
  toNode!: Relation<Node>;

  @Column('varchar')
  to_node_id!: string; //TODO:naming

  @OneToMany(
    () => RelationshipPropertyKey,
    (relationship_property_key) => relationship_property_key.relationship,
  )
  propertyKeys!: RelationshipPropertyKey[];

  // from cpg-server

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}
