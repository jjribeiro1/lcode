import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PackingService } from './packing.service';
import { PackProductsDto } from './dto/pack-products.dto';
import { PackProductsResponseDto } from './dto/pack-products-response.dto';

@Controller('packing')
export class PackingController {
  constructor(private readonly packingService: PackingService) {}

  @Post()
  @HttpCode(200)
  packProducts(@Body() dto: PackProductsDto): PackProductsResponseDto {
    return this.packingService.packProducts(dto);
  }
}
