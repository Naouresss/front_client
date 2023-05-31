import { Category } from "./Category";
import { Command_Product } from "./Command_Product";
import { Supply_product } from "./Supply_product";
export class Product{
    constructor(public id?: number,
                
                public label?: string,
                public quantity?: string,
                public price?: string,
                public imageLink?: string,
                public role?: string,
                public cammandproducts?: Command_Product[],
                public supplyproducts?: Supply_product[],
                public isFavorite: boolean = false,
                public category?: Category
               
                ){
  
    }
  }