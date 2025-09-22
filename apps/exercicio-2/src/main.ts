import { NestFactory } from '@nestjs/core';
import { Exercicio2Module } from './exercicio-2.module';

async function bootstrap() {
  const app = await NestFactory.create(Exercicio2Module);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
