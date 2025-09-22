import { Module } from '@nestjs/common';
import { Exercicio2Controller } from './exercicio-2.controller';
import { Exercicio2Service } from './exercicio-2.service';

@Module({
  imports: [],
  controllers: [Exercicio2Controller],
  providers: [Exercicio2Service],
})
export class Exercicio2Module {}
