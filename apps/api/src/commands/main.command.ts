import * as dotenv from 'dotenv';
import { CommandFactory } from 'nest-commander';
import { CommonCommandModule } from './command.module';

async function bootstrap() {
  try {
    dotenv.config({ path: 'apps/api/.env' });
    console.log('Running command...');
    await CommandFactory.run(CommonCommandModule);
    console.log('Command executed successfully');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

bootstrap();
