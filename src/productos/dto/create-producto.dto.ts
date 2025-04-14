export class CreateProductoDto {
    nombre: string;
    precio: number;
    stock: number;
    categoria: string;
    descripcion: string;
    imagenUrl: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    estado: boolean;
}
