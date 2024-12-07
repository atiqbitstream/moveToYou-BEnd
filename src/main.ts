import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:  '*',  // Make sure your frontend URL is allowed
    methods: 'GET,POST,PATCH,PUT,DELETE,OPTIONS',  // List the allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization',  // Allow the necessary headers
  });
  await app.listen(3001);
}
bootstrap();
