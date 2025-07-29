import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product-dto';
import { UpdateProductDto } from './dtos/update-product-dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getProduct() {
    return this.productService.getProduct();
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productService.updateProduct(Number(id), body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(Number(id));
  }
}
