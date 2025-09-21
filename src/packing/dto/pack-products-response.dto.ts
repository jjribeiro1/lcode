import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PackProductsResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackedOrderDto)
  pedidos: PackedOrderDto[];
}

export class PackedOrderDto {
  @IsInt()
  pedido_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackedBoxDto)
  caixas: PackedBoxDto[];
}

export class PackedBoxDto {
  @IsOptional()
  @IsString()
  caixa_id: string | null;

  @IsArray()
  @IsString({ each: true })
  produtos: string[];

  @IsOptional()
  @IsString()
  observacao?: string;
}
