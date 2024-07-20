import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/integrations';
import { CharacterService } from './characters.service';
import { CharacterResolver } from './characters.resolver';
import { CharacterController } from './characters.controller';
import { characterModelProviders } from 'src/libs';

@Module({
  imports: [DatabaseModule],
  providers: [CharacterService, CharacterResolver, ...characterModelProviders],
  controllers: [CharacterController],
})
export class CharacterModule {}
