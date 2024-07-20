// episode.model.ts
import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CharacterModel } from '../character.model';
import { EpisodeCharacterModel } from '../episode-character.model';

@ObjectType()
@Table({ tableName: 'episodes' })
export class EpisodeModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @Field(() => Int)
  id: number;

  @Column
  @Field()
  name: string;

  @Column
  @Field()
  air_date: string;

  @Column
  @Field()
  episode: string;

  @Column
  @Field()
  url: string;

  @BelongsToMany(() => CharacterModel, () => EpisodeCharacterModel)
  @Field(() => [CharacterModel])
  characters: CharacterModel[];

  @Column({ defaultValue: new Date() })
  @Field(() => Date)
  created_at: Date;

  @Column({ defaultValue: new Date() })
  @Field(() => Date)
  updated_at: Date;

  @Column({ defaultValue: true })
  @Field(() => Boolean)
  isActive: boolean;
}
