import { Module } from '@nestjs/common';
import { DatabaseModule } from '../integrations/database';
import { SeederCommand } from './tasks/seeder/seeder.command';
import {
  characterModelProviders,
  episodeCharacterProviders,
  episodeProviders,
  locationProviders,
} from '../libs/providers';

@Module({
  providers: [
    ...characterModelProviders,
    ...episodeProviders,
    ...locationProviders,
    ...episodeCharacterProviders,
    SeederCommand,
  ],
  imports: [DatabaseModule],
})
export class CommonCommandModule {}
