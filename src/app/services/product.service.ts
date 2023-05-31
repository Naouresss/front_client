import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URLS } from './api.url.config';
import { User } from '../models/User';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private user: AccountService) { }

  private url = "http://localhost:8090/api/product";
 

 addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(API_URLS.PRODUCTS_URL+ `/admin/addition`, product); 
  }

  editProduct(product: Product, id: number): Observable<Product> {
    return this.http.put<Product>(API_URLS.USER_URL+`/admin/update/`+id, product); 
  }
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(API_URLS.USER_URL+`/admin/delete/${id}`); 
  } 
  getAllProductByCategory(id:number): Observable<any>{
    const head = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.user.getToken(),
      }),
    };
    return  this.http.get<Array<Product>>(`http://localhost:8090/api/product/products/${id}`, head);  
  }

 
  getAllProducts() {
    const head = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.user.getToken(),
      }),
    };
    return this.http.get<Array<Product>>(`${this.url}/products`, head);
  }


}