import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Aumenta o limite do body parser para 10MB
  app.use(json({ limit: '10mb' }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
