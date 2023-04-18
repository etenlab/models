import { Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.RELATIONSHIP_TYPES })
export class RelationshipType extends Syncable {
  @PrimaryColumn('varchar')
  type_name!: string; //TODO: naming

  // from cpg-server

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}
