import { Entity, PrimaryColumn } from 'typeorm';
import { Syncable } from '../Syncable';

import { ElectionTypeConst } from '@/constants/voting.constant';

import { TableNameConst } from '@/constants/table-name.constant';

@Entity({ name: TableNameConst.ELECTION_TYPES })
export class ElectionType extends Syncable {
  @PrimaryColumn('varchar')
  type_name!: ElectionTypeConst;
}
