import { Entity, PrimaryColumn } from 'typeorm';
import { Syncable } from '../Syncable';

import { TableNameConst } from '@/constants/table-name.constant';

@Entity({ name: TableNameConst.NODE_TYPES })
export class NodeType extends Syncable {
  @PrimaryColumn('varchar')
  type_name!: string;
}
