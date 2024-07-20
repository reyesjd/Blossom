// location.model.ts
import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { CharacterModel } from '../character.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Table({ tableName: 'locations' })
export class LocationModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @Field(() => Int)
  id: number;

  @Column
  @Field()
  name: string;

  @Column
  @Field()
  type: string;

  @Column
  @Field()
  dimension: string;

  @Column
  @Field()
  url: string;

  @HasMany(() => CharacterModel, 'locationId')
  @Field(() => [CharacterModel])
  residents: CharacterModel[];

  @Column
  @Field(() => Date)
  created_at: Date;

  @Column
  @Field(() => Date)
  updated_at: Date;

  @Column({ defaultValue: true })
  @Field(() => Boolean)
  isActive: boolean;
}
