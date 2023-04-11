import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { nanoid } from 'nanoid';
import { RelationshipPropertyKey } from './relationship-property-key.entity';
import { Syncable } from '../Syncable';

import { TableNameConst } from '@/constants/table-name.constant';

@Entity({ name: TableNameConst.RELATIONSHIP_PROPERTY_VALUES })
export class RelationshipPropertyValue extends Syncable {
  @PrimaryColumn('uuid', { type: 'varchar', length: 21, unique: true })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('text', { nullable: true })
  readonly relationship_property_value_id!: string | null;

  @Column('varchar')
  property_value!: string;

  @OneToOne(() => RelationshipPropertyKey)
  @JoinColumn({
    name: 'relationship_property_key_id',
    referencedColumnName: 'id',
  })
  propertyKey!: RelationshipPropertyKey;

  @Column('varchar')
  relationship_property_key_id!: string;
}
