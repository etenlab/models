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
import { Relationship } from './relationship.entity';
import type { RelationshipPropertyValue } from './relationship-property-value.entity';
import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.RELATIONSHIP_PROPERTY_KEYS })
export class RelationshipPropertyKey extends Syncable {
  @PrimaryColumn('uuid', { type: 'varchar', length: 21, unique: true })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  @Column('text', { nullable: true })
  readonly relationship_property_key_id!: string | null; // TODO: check is it needed an delete

  @Column('varchar')
  property_key!: string; //TODO: naming

  @ManyToOne('Relationship', { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'relationship_id',
    referencedColumnName: 'id',
  })
  relationship!: Relation<Relationship>;

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
  updatedAt?: Date;
}
