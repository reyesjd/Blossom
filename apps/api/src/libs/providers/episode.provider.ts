import { EpisodeModel } from '../models';

export const episodeProviders = [
  {
    provide: 'EPISODE_REPOSITORY',
    useValue: EpisodeModel,
  },
];
