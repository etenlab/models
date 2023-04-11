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
import { Relationship } from './relationship.entity';
import { RelationshipPropertyValue } from './relationship-property-value.entity';
import { Syncable } from '../Syncable';

import { TableNameConst } from '@/constants/table-name.constant';

@Entity({ name: TableNameConst.RELATIONSHIP_PROPERTY_KEYS })
export class RelationshipPropertyKey extends Syncable {
  @PrimaryColumn('uuid', { type: 'varchar', length: 21, unique: true })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('text', { nullable: true })
  readonly relationship_property_key_id!: string | null;

  @Column('varchar')
  property_key!: string;

  @ManyToOne(() => Relationship, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'relationship_id',
    referencedColumnName: 'id',
  })
  relationship!: Relationship;

  @Column('varchar')
  relationship_id!: string;

  @OneToOne(
    () => RelationshipPropertyValue,
    (relationshipPropertyValue) => relationshipPropertyValue.propertyKey,
  )
  propertyValue!: RelationshipPropertyValue;
}
