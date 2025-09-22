import { Injectable } from '@nestjs/common';

@Injectable()
export class Exercicio2Service {
  getHello(): string {
    return 'Hello World!';
  }
}
