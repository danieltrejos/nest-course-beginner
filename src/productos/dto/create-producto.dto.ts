import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";




export class CreateProductoDto {
    @ApiProperty({ description: 'El nombre del producto', example: 'Laptop' })
    @IsStrin
    nombre: string;

    @ApiProperty({ description: 'El precio del producto', example: 1500 })
    precio: number;

    @ApiPropertyOptional({ description: 'La cantidad de stock del producto', example: 50 })
    stock?: number;

    @ApiProperty({ description: 'La categoría del producto', example: 'Electrónica' })
    categoria: string;

    @ApiProperty({ description: 'La descripción del producto', example: 'Laptop de 15 pulgadas' })
    descripcion: string;

    @ApiProperty({ description: 'La URL de la imagen del producto', example: 'http://example.com/laptop.jpg' })
    imagenUrl: string;

    @ApiProperty({ description: 'La fecha de creación del producto', example: '2023-10-01T00:00:00Z', type: 'string', format: 'date-time' })
    fechaCreacion: Date;

    @ApiProperty({ description: 'La fecha de actualización del producto', example: '2023-10-01T00:00:00Z' })
    fechaActualizacion: Date;

    @ApiProperty({ description: 'El estado del producto', type: [String] })
    estado: string[];
}
