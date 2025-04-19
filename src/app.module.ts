import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';//!Configuracion para varibles de entorno

import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';

// Asegurar que el process.env.NODE_ENV se cargue aunque sea en desarrollo
const envFilePath = `.${process.env.NODE_ENV || 'development'}.env`;


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true
    }), ProductosModule, CategoriasModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule { }
