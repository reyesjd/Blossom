import { Sequelize } from 'sequelize-typescript';
import {
  CharacterModel,
  EpisodeCharacterModel,
  EpisodeModel,
  LocationModel,
} from '../../libs';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DBHOST,
        port: parseInt(process.env.DBPORT, 10),
        username: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        logging: false,
      });
      sequelize.addModels([
        CharacterModel,
        EpisodeModel,
        LocationModel,
        EpisodeCharacterModel,
      ]);
      await sequelize.sync({ alter: true });

      return sequelize;
    },
  },
];
