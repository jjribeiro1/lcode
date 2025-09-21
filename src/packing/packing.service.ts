import { Injectable } from '@nestjs/common';
import { PackProductsDto } from './dto/pack-products.dto';

@Injectable()
export class PackingService {
  packProducts(dto: PackProductsDto) {}
}
