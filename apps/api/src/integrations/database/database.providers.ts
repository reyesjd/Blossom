import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      console.log(process.env.DBPASS);

      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DBHOST,
        port: parseInt(process.env.DBPORT, 10),
        username: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
      });
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
