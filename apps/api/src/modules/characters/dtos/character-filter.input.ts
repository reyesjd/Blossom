import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CharacterFilterInput {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  species?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  originId?: number;

  @Field({ nullable: true })
  isFavorite?: boolean;

  @Field({ nullable: true })
  comments?: string;
}
