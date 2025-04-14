import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductosModule } from './productos/productos.module';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductosModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
