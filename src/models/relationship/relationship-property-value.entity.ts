import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  UpdateDateColumn,
} from 'typeorm';
import { nanoid } from 'nanoid';
import { RelationshipPropertyKey } from './relationship-property-key.entity';
import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.RELATIONSHIP_PROPERTY_VALUES })
export class RelationshipPropertyValue extends Syncable {
  @PrimaryColumn('uuid', { type: 'varchar', length: 21, unique: true })
  id!: string;

  @BeforeInsert()
  setId() {
    this.id = nanoid();
  }

  // @Column('text', { nullable: true })
  // readonly relationship_property_value_id!: string | null; // TODO: check is it needed an delete

  @Column('varchar')
  property_value!: string; //TODO: naming

  @OneToOne(() => RelationshipPropertyKey)
  @JoinColumn({
    name: 'relationship_property_key_id',
    referencedColumnName: 'id',
  })
  propertyKey!: RelationshipPropertyKey;

  @Column('varchar')
  relationship_property_key_id!: string; //TODO: naming

  // from cpg-server

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
