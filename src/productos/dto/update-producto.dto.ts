import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';

//El create-producto.dto.js tiene todos los atributos requeridos, el PartialType permite que todos sean parciales
export class UpdateProductoDto extends PartialType(CreateProductoDto) { }
