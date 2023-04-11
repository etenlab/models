import { Entity, PrimaryColumn } from 'typeorm';
import { Syncable } from '../Syncable';

import { TableNameConst } from '@/constants/table-name.constant';

@Entity({ name: TableNameConst.RELATIONSHIP_TYPES })
export class RelationshipType extends Syncable {
  @PrimaryColumn('varchar')
  type_name!: string;
}
