import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dtos/create-product-dto';
import { UpdateProductDto } from './dtos/update-product-dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async createProduct(data: CreateProductDto) {
    return this.prismaService.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: Number(data.price),
      },
    });
  }

  async getProduct() {
    return this.prismaService.product.findMany();
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        price: Number(data.price),
      },
    });
  }

  async deleteProduct(id: number) {
    return this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
