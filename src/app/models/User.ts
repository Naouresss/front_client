import { Command } from "./Command";

export class User{
    constructor(public id?: number,
                
                public nom?: string,
                public prenom?: string,
                public email?: string,
                public password?: string,
                public role?: string,
                public cammands?: Command[]
              
               
                ){
  
    }
  }export interface LoginUser{
    email:string;
    password:string;
}
export interface CurrentUser{
    firstName:string;
    lastName:string;
    email:string;
    role:string;
}
export interface Client{
    id:any;
    email:string;
    nom:string;
    prenom:string;
    unlocked:boolean;
}