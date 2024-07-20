// dto/character-filter.dto.ts
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CharacterFilterDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  species?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  originId?: number;
}
