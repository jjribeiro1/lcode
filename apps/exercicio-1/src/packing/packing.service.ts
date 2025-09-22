import { Injectable } from '@nestjs/common';
import { OrderDto, PackProductsDto, ProductDto } from './dto/pack-products.dto';
import { PackedBoxDto, PackedOrderDto } from './dto/pack-products-response.dto';

type Box = {
  box_id: string;
  altura: number;
  largura: number;
  comprimento: number;
  volume: number;
};

type ProductWithVolume = ProductDto & { volume: number };

@Injectable()
export class PackingService {
  private readonly boxes: Box[] = [
    {
      box_id: 'Caixa 1',
      altura: 30,
      largura: 40,
      comprimento: 80,
      volume: 96000,
    },
    {
      box_id: 'Caixa 2',
      altura: 50,
      largura: 50,
      comprimento: 40,
      volume: 100000,
    },
    {
      box_id: 'Caixa 3',
      altura: 50,
      largura: 80,
      comprimento: 60,
      volume: 240000,
    },
  ];

  private readonly PACKING_EFFICIENCY = 0.7;

  packProducts(dto: PackProductsDto) {
    const packedOrders: PackedOrderDto[] = [];

    for (const order of dto.pedidos) {
      const packedBoxes = this.packOrder(order);
      packedOrders.push({
        pedido_id: order.pedido_id,
        caixas: packedBoxes,
      });
    }

    return { pedidos: packedOrders };
  }

  private packOrder(order: OrderDto) {
    const packedBoxes: PackedBoxDto[] = [];
    let productsToPack = this.sortedProductsByVolume(order.produtos);

    while (productsToPack.length > 0) {
      const firstProduct = productsToPack[0];
      const bestBox = this.findBestBox(firstProduct);

      if (!bestBox) {
        packedBoxes.push({
          caixa_id: null,
          produtos: [firstProduct.produto_id],
          observacao: 'Produto não cabe em nenhuma caixa disponível',
        });

        productsToPack.shift();
        continue;
      }

      const { productsInBox, remainingProducts } = this.packProductsInBox(
        productsToPack,
        bestBox,
      );

      packedBoxes.push({
        caixa_id: bestBox.box_id,
        produtos: productsInBox.map((p) => p.produto_id),
      });
      productsToPack = remainingProducts;
    }

    return packedBoxes;
  }

  private packProductsInBox(products: ProductWithVolume[], box: Box) {
    const productsInBox: ProductWithVolume[] = [products[0]];
    const remainingProducts: ProductWithVolume[] = [];
    let usedVolume = products[0].volume;

    for (let i = 1; i < products.length; i++) {
      const product = products[i];

      if (
        this.checkGeometricFit(product, box) &&
        usedVolume + product.volume <= box.volume * this.PACKING_EFFICIENCY
      ) {
        productsInBox.push(product);
        usedVolume += product.volume;
      } else {
        remainingProducts.push(product);
      }
    }

    return { productsInBox, remainingProducts };
  }

  private findBestBox(product: ProductDto): Box | null {
    const fittingBoxes = this.boxes.filter((box) =>
      this.checkGeometricFit(product, box),
    );

    if (fittingBoxes.length === 0) {
      return null;
    }

    return fittingBoxes.reduce((bestBox, currentBox) =>
      currentBox.volume < bestBox.volume ? currentBox : bestBox,
    );
  }

  private checkGeometricFit(product: ProductDto, box: Box): boolean {
    const pDims = Object.values(product.dimensoes).sort((a, b) => a - b);
    const bDims = [box.altura, box.largura, box.comprimento].sort(
      (a, b) => a - b,
    );
    return pDims[0] <= bDims[0] && pDims[1] <= bDims[1] && pDims[2] <= bDims[2];
  }

  private sortedProductsByVolume(products: ProductDto[]): ProductWithVolume[] {
    return products
      .map((p) => ({
        ...p,
        volume:
          p.dimensoes.altura * p.dimensoes.largura * p.dimensoes.comprimento,
      }))
      .sort((a, b) => b.volume - a.volume);
  }
}
