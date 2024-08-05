import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, productSchema,productModel } from './product.model';
import  {model, Model,Mongoose}  from 'mongoose';


@Injectable()
export class ProductsService {
 private products: Product[] = [];

 
 constructor(@InjectModel('Product') private readonly productSchema:Model<Product>) {
  // const productModel = Mongoose. ("products",productSchema);
  console.log("hello world ")
  this.getProducts()

 }

 async insertProduct(title: string, desc: string, price: number,company: string) {    
    const newProduct = new this.productSchema({
      title:title,
      description:desc,
      price:price,
      company:company
    })
   const result = await newProduct.save();
   console.log(result); 
   return 'prodId';
  }

 async getProducts() {
    // const productData = await products.find();
//  const productData = await this.findProduct();
    // return productData;
    this.products = (await  this.productSchema.find().exec());
    return this.products;
  }

 async getSingleProduct(productId: string) {
    console.log("inside single product")
    const product =await this.findProduct(productId);
    return product ;
  }

 async updateProduct(productId: string, title: string, desc: string, price: number,company:string) {
  console.log("inside update product") 
  const product =await this.findProduct(productId);
    const updatedProduct = product ;
    console.log(updatedProduct)
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if(company)
    {
      updatedProduct.company = company;
    }
   
    let x = await this.productSchema.findByIdAndUpdate(productId,updatedProduct)

  }

  async deleteProduct(prodId: string) {

      await this.productSchema.findByIdAndDelete(prodId).exec();             //One(prodId)
  }

  private async findProduct(id: string): Promise<Product> {
  
    const product= await   this.productSchema.findById(id).exec()
  
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    else
    {
    console.log(product)
    }
    return  product;
  }
}

