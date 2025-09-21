import { Body, Controller, Post } from '@nestjs/common';
import { PackingService } from './packing.service';
import { PackProductsDto } from './dto/pack-products.dto';

@Controller('packing')
export class PackingController {
  constructor(private readonly packingService: PackingService) {}

  @Post()
  packProducts(@Body() dto: PackProductsDto) {
    return this.packingService.packProducts(dto);
  }
}
