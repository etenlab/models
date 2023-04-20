import { Column, Entity, PrimaryColumn, Index } from 'typeorm';
import { nanoid } from 'nanoid';

import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.SITE_TEXT })
@Index(['app_id', 'word_ref', 'definition_ref'], { unique: true })
export class SiteText extends Syncable {
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
    name: 'site_text_translation_id',
  })
  id!: string;

  @Column('text', { nullable: true })
  readonly site_text_id!: string | null;

  @Column('varchar')
  app_id!: string;

  @Column({ type: 'varchar' })
  word_ref!: string;

  @Column({ type: 'varchar' })
  definition_ref!: string;

  @Column({ type: 'varchar' })
  original_language_id!: string;
}
