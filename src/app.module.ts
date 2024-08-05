import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { productModel } from './products/product.model';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { ProductsService } from './products/products.service';

@Module({
  
  imports: [ProductsModule,MongooseModule.forRoot('mongodb://localhost:27017/demo_product_api')],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
