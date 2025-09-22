import { Test, TestingModule } from '@nestjs/testing';
import { Exercicio2Controller } from './exercicio-2.controller';
import { Exercicio2Service } from './exercicio-2.service';

describe('Exercicio2Controller', () => {
  let exercicio2Controller: Exercicio2Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Exercicio2Controller],
      providers: [Exercicio2Service],
    }).compile();

    exercicio2Controller = app.get<Exercicio2Controller>(Exercicio2Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(exercicio2Controller.getHello()).toBe('Hello World!');
    });
  });
});
