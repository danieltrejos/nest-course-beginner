import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';


@Injectable()
export class ProductosService {

  //Aqui se define el mock de la data o el servicio de Prisma



  create(createProductoDto: CreateProductoDto) {
    return createProductoDto; //Devulvo el mismo elemento, sin validacion lo pasa igual a como viene
  }

  findAll() {
    return `This action returns all productos`;//Consultar por todos a la bd
  }

  findOne(id: number) {

    //if (!producto) throw new NotFoundException('Producto Not Found')

    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto: ${updateProductoDto.nombre}`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
