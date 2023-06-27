import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { nanoid } from 'nanoid';
import { RelationshipPropertyKey } from './relationship-property-key.entity';
import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.RELATIONSHIP_PROPERTY_VALUES })
export class RelationshipPropertyValue extends Syncable {
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
    name: 'relationship_property_value_id',
  })
  id!: string;

  // @Column('text', { nullable: true })
  // readonly relationship_property_value_id!: string | null; // TODO: check is it needed an delete

  @Index()
  @Column('varchar')
  property_value!: string; //TODO: naming

  @OneToOne(() => RelationshipPropertyKey)
  @JoinColumn({
    name: 'relationship_property_key_id',
    referencedColumnName: 'id',
  })
  propertyKey!: RelationshipPropertyKey;

  @Index()
  @Column('varchar')
  relationship_property_key_id!: string; //TODO: naming

  // from cpg-server

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}
