import { Supply_product } from "./Supply_product";

export class Supply{
    constructor(public id?: number,
                
                public interventionDate?: string,
                
                public supplyproducts?: Supply_product[]
              
               
                ){
  
    }
  }