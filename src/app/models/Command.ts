import { Command_Product } from "./Command_Product";

export class Command{
    constructor(public id?: number,
                
                public createdAt?: string,
                public totalPrice?: string,
                public type?: string,
                public cammandproducts?: Command_Product[]
              
               
                ){
  
    }
  }