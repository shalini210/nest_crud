import {  Controller,  Post,  Body,  Get,  Param,  Patch,  Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('company') prodCompany: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
      prodCompany
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    console.log("inside get all")
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    console.log("indisbfksjd ")
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('company') prodCompany: string,
  ) {
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice,prodCompany)
    .then(()=> "updated")
    .catch(()=>"Not found")
    
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
      this.productsService.deleteProduct(prodId);
      return "deleted";
  }
}

