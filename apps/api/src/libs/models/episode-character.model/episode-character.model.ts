// episode-character.model.ts
import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EpisodeModel } from '../episode.model';
import { CharacterModel } from '../character.model';

@ObjectType()
@Table({ tableName: 'episode_character' })
export class EpisodeCharacterModel extends Model {
  @Field(() => Int)
  @ForeignKey(() => EpisodeModel)
  @Column
  episodeId: number;

  @Field(() => Int)
  @ForeignKey(() => CharacterModel)
  @Column
  characterId: number;
}
