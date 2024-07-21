import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { CacheModule } from '@nestjs/cache-manager';
import { CharacterModule } from './modules';

@Module({
  imports: [
    // Infrastructure imports
    CacheModule.register({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),

    // App module imports
    CharacterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
