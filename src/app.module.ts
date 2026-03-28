import { Module } from '@nestjs/common';
import { ProductoModule } from './producto/producto.module';
import {ConfigModule} from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({

    })
    , ProductoModule],
  
})
export class AppModule {}
