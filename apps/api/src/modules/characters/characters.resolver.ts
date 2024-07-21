import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CharacterModel } from 'src/libs';
import { CharacterService } from './characters.service';
import { CharacterFilterInput } from './dtos/character-filter.input';

// character-filter.input.ts

@Resolver(() => CharacterModel)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @Query(() => [CharacterModel])
  async characters(
    @Args('filters', { type: () => CharacterFilterInput, nullable: true })
    filters: CharacterFilterInput,
  ): Promise<CharacterModel[]> {
    return this.characterService.findAll(filters);
  }

  @Mutation(() => CharacterModel)
  async favoriteCharacter(@Args('id') id: number): Promise<CharacterModel> {
    return this.characterService.favoriteCharacter(id);
  }

  @Mutation(() => CharacterModel)
  async addComment(
    @Args('id') id: number,
    @Args('comment') comment: string,
  ): Promise<CharacterModel> {
    return this.characterService.addComment(id, comment);
  }
}
