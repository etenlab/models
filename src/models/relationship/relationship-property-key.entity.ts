import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { nanoid } from 'nanoid';
import { Relationship } from './relationship.entity';
import type { Relation } from 'typeorm';
import type { RelationshipPropertyValue } from './relationship-property-value.entity';
import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.RELATIONSHIP_PROPERTY_KEYS })
export class RelationshipPropertyKey extends Syncable {
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
    name: 'relationship_property_key_id',
  })
  id!: string;

  // @Column('text', { nullable: true })
  // readonly relationship_property_key_id!: string | null; // TODO: check is it needed an delete

  @Index()
  @Column('varchar')
  property_key!: string; //TODO: naming

  @ManyToOne('Relationship', { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'relationship_id',
    referencedColumnName: 'id',
  })
  relationship!: Relation<Relationship>;

  @Index()
  @Column('varchar')
  relationship_id!: string; //TODO: naming

  @OneToOne(
    'RelationshipPropertyValue',
    (relationshipPropertyValue: RelationshipPropertyValue) =>
      relationshipPropertyValue.propertyKey,
  )
  propertyValue!: Relation<RelationshipPropertyValue>;

  // from cpg-server

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}
