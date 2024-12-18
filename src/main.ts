import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',  // Make sure your frontend URL is allowed
    methods: 'GET,POST,PUT,DELETE,OPTIONS',  // List the allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization',  // Allow the necessary headers
  });
  await app.listen(3001);
}
bootstrap();
