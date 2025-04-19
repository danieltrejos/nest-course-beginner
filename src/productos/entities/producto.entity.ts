

//Nos sirve para detallar como se ve el dato
export class Producto {
    id: string;
    nombre: string;
    precio: number;
    stock: number;
    categoria: string;
    descripcion: string;
    imagenUrl: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    estado: string[];
}
