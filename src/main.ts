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
  app.enableCors({
    origin: ['https://astropartner.netlify.app', 'http://localhost:4200'],
    methods: 'GET,POST,PUT,DELETE', 
    allowedHeaders: 'Content-Type, Authorization', 
    credentials: true, 
  });
  
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
