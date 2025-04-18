import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

/* import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger'; */


//@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) { }

  //@ApiResponse({ status: 200, description: 'Lista de productos obtenida satisfactoriamente.' })
  /* @ApiOperation({ summary: 'Obtener lista de productos' })
  @ApiOkResponse({
    description: 'Lista de productos obtenida satisfactoriamente.',
    type: CreateProductoDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'No se encontraron productos.' }) */
  @Get() //! Get /productos
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id') //! Get /productos/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  /* @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiOkResponse({ description: 'Producto creado satisfactoriamente.' })
  @ApiCreatedResponse({ description: 'Producto creado satisfactoriamente.' })
  @ApiBadRequestResponse({ description: 'Error al crear el producto.' }) */
  @Post() //! Post /productos
  create(@Body(ValidationPipe) createProductoDto: CreateProductoDto) {
    console.log(createProductoDto)// El contenido del body se almacena como dto -> y se manda al servicio
    return this.productosService.create(createProductoDto);
  }

  @Patch(':id') //! Path /productos/:id
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id') //! Delete /productos/:id
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }

}
