import { Column, Entity, PrimaryColumn, Index } from 'typeorm';

import { nanoid } from 'nanoid';

import { Syncable } from '../Syncable';
import { TableNameConst } from '../../constants/table-name.constant';

@Entity({ name: TableNameConst.SITE_TEXT_TRANSLATION })
@Index(['site_text_id', 'word_ref', 'definition_ref', 'language_id'], {
  unique: true,
})
export class SiteTextTranslation extends Syncable {
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

  // @Column('text', { nullable: true })
  // readonly site_text_translation_id!: string | null;

  @Column('varchar')
  site_text_id!: string;

  @Column({ type: 'varchar' })
  word_ref!: string;

  @Column({ type: 'varchar' })
  definition_ref!: string;

  @Column({ type: 'varchar' })
  language_id!: string;

  @Column({ type: 'boolean', default: false })
  is_selected!: boolean;
}
