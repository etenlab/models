import { Entity, PrimaryColumn } from 'typeorm';
import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';
import { ElectionTypeConst } from '../../constants/voting.constant';

@Entity({ name: TableNameConst.ELECTION_TYPES })
export class ElectionType extends Syncable {
  @PrimaryColumn('varchar')
  type_name!: ElectionTypeConst;
}
