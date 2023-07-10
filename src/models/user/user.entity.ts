import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';

import { nanoid } from 'nanoid';

import { TableNameConst } from '../../constants/table-name.constant';

@ObjectType()
@Entity({ name: TableNameConst.USERS })
export class User {
  constructor() {
    this.user_id = this.user_id || nanoid();
  }

  // We use constructor assigment in order to custom id (nanoid)
  // be created upon entity creation(so we can use it while building relations before entity instance  was saved)
  // We don't want to use @BeforeIsert() to set up id because we dont want id to be changed.
  @Field()
  @PrimaryColumn({
    type: 'varchar',
    length: 21,
  })
  user_id!: string;

  @Field()
  @Column('varchar')
  kid!: string;

  @Field(() => Boolean, { defaultValue: true })
  @Column({ type: 'boolean', default: true })
  active!: boolean;

  @Field()
  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Field()
  @Column({ type: 'varchar', unique: true })
  username!: string;

  @Field()
  @Column('varchar')
  first_name!: string;

  @Field()
  @Column('varchar')
  last_name!: string;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ type: 'boolean', default: false })
  is_email_verified!: boolean;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  avatar_url?: string;

  @BeforeInsert()
  setCreateDate(): void {
    this.created_at = new Date();
  }

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}
