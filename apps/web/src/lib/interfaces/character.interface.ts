interface ILocation {
  id: number;
  name: string;
}

interface IEpisode {
  id: number;
  name: string;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ILocation;
  location: ILocation;
  episodes: IEpisode[];
  image: string;
  url: string;
  isFavorite: boolean;
  comments: string;
}

export interface ICharacterFilterInput {
  id?: number;
  status?: string;
  species?: string;
  gender?: string;
  name?: string;
  originId?: number;
  isFavorite?: boolean;
}
