import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { API_URLS } from './api.url.config';
import { User } from '../models/User';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { Supply } from '../models/Supply';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

 constructor(private http: HttpClient){


 }
 getAllSupplys(): Observable<any>{
   return  this.http.get(API_URLS.SUPPLY_URL+`/admin/supplies`);  
 }
 addSupply(supply: Supply): Observable<Supply> {
    return this.http.post<Supply>(API_URLS.SUPPLY_URL+ `/admin/addition`, supply); 
  }


  deleteSupply(id: number): Observable<Product> {
    return this.http.delete<Supply>(API_URLS.SUPPLY_URL+`/admin/delete/${id}`); 
  } 

}