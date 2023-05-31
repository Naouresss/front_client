import { Product } from "./Product";

export class Category{
    constructor(public id?: number,
                
                public label?: string,
                public products?: Product[]
               
                ){
  
    }
  }