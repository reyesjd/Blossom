import { LocationModel } from '../models';

export const locationProviders = [
  {
    provide: 'LOCATION_REPOSITORY',
    useValue: LocationModel,
  },
];
