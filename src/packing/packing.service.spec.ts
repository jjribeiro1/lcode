import { Test, TestingModule } from '@nestjs/testing';
import { PackingService } from './packing.service';
import { PackProductsDto } from './dto/pack-products.dto';

describe('PackingService', () => {
  let service: PackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackingService],
    }).compile();

    service = module.get<PackingService>(PackingService);
  });

  describe('packProducts', () => {
    it('should pack a single product that fits in smallest box', () => {
      const dto: PackProductsDto = {
        pedidos: [
          {
            pedido_id: 1,
            produtos: [
              {
                produto_id: 'PROD001',
                dimensoes: { altura: 10, largura: 20, comprimento: 30 },
              },
            ],
          },
        ],
      };

      const result = service.packProducts(dto);

      expect(result.pedidos).toHaveLength(1);
      expect(result.pedidos[0].pedido_id).toBe(1);
      expect(result.pedidos[0].caixas).toHaveLength(1);
      expect(result.pedidos[0].caixas[0].caixa_id).toBe('Caixa 1');
      expect(result.pedidos[0].caixas[0].produtos).toEqual(['PROD001']);
    });

    it('should pack multiple products in same box when they fit', () => {
      const dto: PackProductsDto = {
        pedidos: [
          {
            pedido_id: 1,
            produtos: [
              {
                produto_id: 'PROD001',
                dimensoes: { altura: 10, largura: 10, comprimento: 10 },
              },
              {
                produto_id: 'PROD002',
                dimensoes: { altura: 5, largura: 5, comprimento: 5 },
              },
            ],
          },
        ],
      };

      const result = service.packProducts(dto);

      expect(result.pedidos[0].caixas).toHaveLength(1);
      expect(result.pedidos[0].caixas[0].produtos).toHaveLength(2);
      expect(result.pedidos[0].caixas[0].produtos).toContain('PROD001');
      expect(result.pedidos[0].caixas[0].produtos).toContain('PROD002');
    });

    it('should use multiple boxes when products do not fit in one', () => {
      const dto: PackProductsDto = {
        pedidos: [
          {
            pedido_id: 1,
            produtos: [
              {
                produto_id: 'PROD001',
                dimensoes: { altura: 30, largura: 40, comprimento: 80 },
              },
              {
                produto_id: 'PROD002',
                dimensoes: { altura: 30, largura: 40, comprimento: 80 },
              },
            ],
          },
        ],
      };

      const result = service.packProducts(dto);

      expect(result.pedidos[0].caixas).toHaveLength(2);
      expect(result.pedidos[0].caixas[0].produtos).toEqual(['PROD001']);
      expect(result.pedidos[0].caixas[1].produtos).toEqual(['PROD002']);
    });

    it('should handle product that does not fit in any box', () => {
      const dto: PackProductsDto = {
        pedidos: [
          {
            pedido_id: 1,
            produtos: [
              {
                produto_id: 'PROD001',
                dimensoes: { altura: 100, largura: 100, comprimento: 100 },
              },
            ],
          },
        ],
      };

      const result = service.packProducts(dto);

      expect(result.pedidos[0].caixas).toHaveLength(1);
      expect(result.pedidos[0].caixas[0].caixa_id).toBeNull();
      expect(result.pedidos[0].caixas[0].produtos).toEqual(['PROD001']);
      expect(result.pedidos[0].caixas[0].observacao).toBe(
        'Produto não cabe em nenhuma caixa disponível',
      );
    });

    it('should handle multiple orders', () => {
      const dto: PackProductsDto = {
        pedidos: [
          {
            pedido_id: 1,
            produtos: [
              {
                produto_id: 'PROD001',
                dimensoes: { altura: 10, largura: 10, comprimento: 10 },
              },
            ],
          },
          {
            pedido_id: 2,
            produtos: [
              {
                produto_id: 'PROD002',
                dimensoes: { altura: 20, largura: 20, comprimento: 20 },
              },
            ],
          },
        ],
      };

      const result = service.packProducts(dto);

      expect(result.pedidos).toHaveLength(2);
      expect(result.pedidos[0].pedido_id).toBe(1);
      expect(result.pedidos[1].pedido_id).toBe(2);
    });
  });
});
