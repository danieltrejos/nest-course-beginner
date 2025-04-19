/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProductsService {

  // Inyección de dependencias
  constructor(private readonly prismaService: PrismaService) { }

  // POST /api/v1/products
  create(createProductDto: CreateProductDto) {
    try {

      return this.prismaService.product.create({
        data: createProductDto
      })
    }
    catch (error) {
      console.log('Error en el servicio de productos:', error);
      throw new Error('Error al crear el producto');
    }

  }

  // GET /api/v1/products
  findAll() {
    return this.prismaService.product.findMany()
  }

  // GET /api/v1/products/:id
  async findOne(id: number) {
    const productFound = await this.prismaService.product.findUnique({ where: { id } });
    // Validación de que el producto existe
    if (!productFound) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return productFound;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productUpdate = await this.prismaService.product.update({
      where: { id },
      data: updateProductDto
    })
    // Validación de que el producto existe
    if (!productUpdate) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return productUpdate;
  }

  async remove(id: number) {
    const deletedProduct = await this.prismaService.product.delete({ where: { id } });
    // Validación de que el producto existe
    if (!deletedProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return deletedProduct;
  }
}
