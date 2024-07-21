import { EpisodeCharacterModel } from '../models';

export const episodeCharacterProviders = [
  {
    provide: 'EPISODE_CHARACTER_REPOSITORY',
    useValue: EpisodeCharacterModel,
  },
];
