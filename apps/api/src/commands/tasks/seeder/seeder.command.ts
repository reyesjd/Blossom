import { Inject, Injectable } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import axios from 'axios';
import {
  CharacterModel,
  LocationModel,
  EpisodeModel,
  EpisodeCharacterModel,
} from '../../../libs';
import { ICharacter, IEpisode, ILocation } from './seeder.interfaces';

@Injectable()
@Command({
  name: 'seed',
  description: 'Seed the database with initial data',
})
export class SeederCommand extends CommandRunner {
  constructor(
    @Inject('CHARACTER_REPOSITORY')
    private readonly characterModel: typeof CharacterModel,
    @Inject('LOCATION_REPOSITORY')
    private readonly locationModel: typeof LocationModel,
    @Inject('EPISODE_REPOSITORY')
    private readonly episodeModel: typeof EpisodeModel,
    @Inject('EPISODE_CHARACTER_REPOSITORY')
    private readonly episodeCharacterModel: typeof EpisodeCharacterModel,
  ) {
    super();
  }

  async run(): Promise<void> {
    try {
      // get the first 15 characters from the API
      const charactersIds = Array.from({ length: 15 }, (_, i) => i + 1);
      const result = await axios.get(
        'https://rickandmortyapi.com/api/character/' + charactersIds.join(','),
      );

      let characters: ICharacter[] = result.data;
      // remove duplicates
      characters = Array.from(
        new Set(characters.map((character) => character.id)),
      ).map((id) => characters.find((character) => character.id === id));

      const locationsIdsToInsert: string[] = characters
        .map((character) => {
          const originId = character.origin.url.split('/').pop();
          const locationId = character.location.url.split('/').pop();
          return [originId, locationId];
        })
        .flat();

      const episodesIdsToInsert: string[] = characters
        .map((character) =>
          character.episode.map((episode) => episode.split('/').pop()),
        )
        .flat();

      const episodesIds = [...new Set(episodesIdsToInsert)];
      const episodesResult = await axios.get(
        'https://rickandmortyapi.com/api/episode/' + episodesIds.join(','),
      );

      let episodes: IEpisode[] = episodesResult.data;
      // remove duplicates
      episodes = Array.from(new Set(episodes.map((episode) => episode.id))).map(
        (id) => episodes.find((episode) => episode.id === id),
      );

      // get locations from the API
      const locationsIds = [...new Set(locationsIdsToInsert)];
      const locationsResult = await axios.get(
        'https://rickandmortyapi.com/api/location/' + locationsIds.join(','),
      );

      let locations: ILocation[] = locationsResult.data;
      // remove duplicates
      locations = Array.from(
        new Set(locations.map((location) => location.id)),
      ).map((id) => locations.find((location) => location.id === id));

      // insert or update locations
      for (const location of locations) {
        await this.locationModel.upsert({
          id: location.id,
          name: location.name,
          type: location.type,
          dimension: location.dimension,
          url: location.url,
          created_at: Date.parse(location.created),
          updated_at: new Date(),
        });
      }

      // insert or update episodes
      for (const episode of episodes) {
        await this.episodeModel.upsert({
          id: episode.id,
          name: episode.name,
          air_date: episode.air_date,
          episode: episode.episode,
          characters: episode.characters,
          url: episode.url,
          created_at: Date.parse(episode.created),
          updated_at: new Date(),
        });
      }

      // insert or update characters
      for (const character of characters) {
        await this.characterModel.upsert({
          id: character.id,
          name: character.name,
          status: character.status,
          species: character.species,
          type: character.type,
          gender: character.gender,
          originId: character.origin.url.split('/').pop()
            ? parseInt(character.origin.url.split('/').pop())
            : null,
          locationId: character.location.url.split('/').pop()
            ? parseInt(character.location.url.split('/').pop())
            : null,
          image: character.image,
          url: character.url,
          created_at: Date.parse(character.created),
          updated_at: new Date(),
        });
      }

      // insert or update episodes characters
      for (const character of characters) {
        for (const episode of character.episode) {
          await this.episodeCharacterModel.upsert({
            episodeId: parseInt(episode.split('/').pop()),
            characterId: character.id,
          });
        }
      }

      console.log('Data seeding completed successfully');
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }
}
