import { CharacterModel } from '../models';

export const characterModelProviders = [
  {
    provide: 'CHARACTER_REPOSITORY',
    useValue: CharacterModel,
  },
];
