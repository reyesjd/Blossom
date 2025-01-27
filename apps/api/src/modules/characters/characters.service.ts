// character.service.ts
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { Op } from 'sequelize';
import {
  CharacterModel,
  EpisodeModel,
  LocationModel,
  LogExecutionTime,
} from 'src/libs';

@Injectable()
export class CharacterService {
  constructor(
    @Inject('CHARACTER_REPOSITORY')
    private readonly characterModel: typeof CharacterModel,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  @LogExecutionTime()
  async findAll(filters: {
    id?: number;
    status?: string;
    species?: string;
    gender?: string;
    name?: string;
    originId?: number;
    isFavorite?: boolean;
  }): Promise<CharacterModel[]> {
    const cacheKey = JSON.stringify(filters);
    const cachedData = await this.cacheManager.get<CharacterModel[]>(cacheKey);

    if (cachedData) {
      console.log(
        '************************************ Returning cached data ************************************',
      );

      return cachedData;
    }

    const where: any = {};

    if (filters.id) {
      where.id = filters.id;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.species) {
      where.species = filters.species;
    }

    if (filters.gender) {
      where.gender = filters.gender;
    }

    if (filters.name) {
      where.name = { [Op.iLike]: `%${filters.name}%` }; // Case-insensitive search
    }

    if (filters.originId) {
      where.originId = filters.originId;
    }

    if (filters.isFavorite) {
      where.isFavorite = filters.isFavorite;
    }

    const characters = await this.characterModel.findAll({
      where,
      include: [
        { model: LocationModel, as: 'origin' },
        { model: LocationModel, as: 'location' },
        { model: EpisodeModel, through: { attributes: [] } },
      ],
    });

    await this.cacheManager.set(cacheKey, characters), { ttl: 60 };

    return characters;
  }

  @LogExecutionTime()
  async favoriteCharacter(id: number): Promise<CharacterModel> {
    const character = await this.characterModel.findByPk(id);

    if (!character) {
      throw new Error('Character not found');
    }

    character.isFavorite = !character.isFavorite;

    await character.save();

    return character;
  }

  @LogExecutionTime()
  async addComment(id: number, comment: string): Promise<CharacterModel> {
    const character = await this.characterModel.findByPk(id);

    if (!character) {
      throw new Error('Character not found');
    }

    character.comments = comment;

    await character.save();

    return character;
  }
}
