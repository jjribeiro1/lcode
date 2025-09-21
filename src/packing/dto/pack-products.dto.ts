import { Type } from 'class-transformer';
import { IsPositive, IsString, ValidateNested } from 'class-validator';

export class PackProductsDto {
  @Type(() => OrderDto)
  @ValidateNested({ each: true })
  pedidos: OrderDto[];
}

class OrderDto {
  @IsPositive({ message: 'O ID do pedido deve ser um número positivo' })
  pedido_id: number;

  @Type(() => ProductDto)
  @ValidateNested({ each: true })
  produtos: ProductDto[];
}

class DimensionsDto {
  @IsPositive({ message: 'A altura deve ser um número positivo' })
  altura: number;

  @IsPositive({ message: 'A largura deve ser um número positivo' })
  largura: number;

  @IsPositive({ message: 'O comprimento deve ser um número positivo' })
  comprimento: number;
}

class ProductDto {
  @IsString({ message: 'O ID do produto deve ser uma string' })
  produto_id: string;

  @Type(() => DimensionsDto)
  @ValidateNested()
  dimensoes: DimensionsDto;
}
