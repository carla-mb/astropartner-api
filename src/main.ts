import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from 'data-source';

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    // Automatically execute migrations
    await AppDataSource.runMigrations(); 
  } catch (error) {
    console.error('Error executing migrations:', error);
  }
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
