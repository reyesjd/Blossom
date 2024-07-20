// character.model.ts
import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { LocationModel } from '../location.model';
import { EpisodeModel } from '../episode.model';
import { EpisodeCharacterModel } from '../episode-character.model';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CharacterStatus } from './enum';

registerEnumType(CharacterStatus, {
  name: 'CharacterStatus',
  description: 'Status of the character',
});

@ObjectType()
@Table({ tableName: 'characters' })
export class CharacterModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @Field(() => Int)
  id: number;

  @Column
  @Field()
  name: string;

  @Field(() => CharacterStatus)
  @Column
  status: CharacterStatus;

  @Column
  @Field()
  species: string;

  @Column
  @Field()
  type: string;

  @Column
  @Field()
  gender: string;

  @ForeignKey(() => LocationModel)
  @Column({ allowNull: true })
  @Field(() => Int)
  originId: number;

  @ForeignKey(() => LocationModel)
  @Field(() => Int)
  locationId: number;

  @BelongsTo(() => LocationModel, 'originId')
  @Field(() => LocationModel, { nullable: true })
  origin: LocationModel;

  @BelongsTo(() => LocationModel, 'locationId')
  @Field(() => LocationModel)
  location: LocationModel;

  @BelongsToMany(() => EpisodeModel, () => EpisodeCharacterModel)
  @Field(() => [EpisodeModel])
  episodes: EpisodeModel[];

  @Column
  @Field()
  image: string;

  @Column
  @Field()
  url: string;

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
