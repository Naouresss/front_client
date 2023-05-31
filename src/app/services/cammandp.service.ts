import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { API_URLS } from './api.url.config';
import { User } from '../models/User';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { Supply } from '../models/Supply';
import { Command } from '../models/Command';

@Injectable({
  providedIn: 'root'
})
export class CammandpService {

 constructor(private http: HttpClient){


 }
 getCammandps(id: number): Observable<any>{
   return  this.http.get(API_URLS.CAMMANDPRODUCT_URL+`/details/${id}`);  
 }

}