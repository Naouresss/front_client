import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URLS } from './api.url.config';
import { User } from '../models/User';
import { Category } from '../models/Category';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private user: AccountService) { }

 addCategorie(category: Category): Observable<User> {
    return this.http.post<Category>(API_URLS.CATEGORIES_URL+ `/admin/addition`, category); 
  }

  editCategorie(category: Category, id: number): Observable<User> {
    return this.http.put<Category>(API_URLS.USER_URL+`/admin/update/`+id, category); 
  }
  deleteCategorie(id: number): Observable<User> {
    return this.http.delete<Category>(API_URLS.USER_URL+`/admin/delete/${id}`); 
  } 
  private url = "http://localhost:8090/api/category";

  getAllCategories() {
    const head = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.user.getToken(),
      }),
    };
    return this.http.get<Array<Category>>(`${this.url}/categories`, head);
  }
  registerCategory(category: Category) {
    const head = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.user.getToken(),
      }),
    };
    return this.http.post(`${this.url}/admin/addition`, category, head);
  }
  deleteCategory(id:string) {
    const head = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.user.getToken(),
      }),
    };
    return this.http.delete(`${this.url}/admin/delete/${id}`, head);
  }
  updateCategory(category: Category) {
    const head = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.user.getToken(),
      }),
    };
    return this.http.put(`${this.url}/admin/update/${category.id}`, category,head);
  }
}