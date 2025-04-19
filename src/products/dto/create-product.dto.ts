//import { Product } from 'generated/prisma';
//export type CreateProductDto = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsPositive,
    Min,


} from 'class-validator';


export class CreateProductDto {

    @Min(2)
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    stock: number;

    @IsOptional()
    @IsString()
    image?: string;
}
