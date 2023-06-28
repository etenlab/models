import { Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.ELECTION_TYPES })
export class ElectionType extends Syncable {
  @PrimaryColumn('varchar')
  type_name!: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}
