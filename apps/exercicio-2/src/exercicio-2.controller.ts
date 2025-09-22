import { Controller, Get } from '@nestjs/common';
import { Exercicio2Service } from './exercicio-2.service';

@Controller()
export class Exercicio2Controller {
  constructor(private readonly exercicio2Service: Exercicio2Service) {}

  @Get()
  getHello(): string {
    return this.exercicio2Service.getHello();
  }
}
