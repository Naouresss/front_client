import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URLS } from './api.url.config';
import { Client, User } from '../models/User';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:8090/api/user";
  private authTokenKey = 'authToken';
 constructor(private http: HttpClient,private user: AccountService){


 }
 getAllUtilisateurs(): Observable<any> {
  const authToken = this.getAuthToken();
   
  if (authToken) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + authToken
    );
  return this.http.get('http://localhost:8090/api/user/clients',  { headers });
}
return throwError('');
}


getAuthToken(): string | null {
  return localStorage.getItem(this.authTokenKey);
}


 addUser(user: User): Observable<User> {
    return this.http.post<User>(API_URLS.USER_URL+ `/register_client`, user); 
  }
  login(user: User): Observable<User> {
    return this.http.post<User>(API_URLS.USER_URL+ `/login`, user); 
  }
  editUser(id: number, user: User): Observable<User> {

      return this.http.put<User>(API_URLS.USER_URL+`/update_user/${id}/`, user);
   
    }
    
    


  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(API_URLS.USER_URL+`/delete/${id}`); 
  } 

  getUserById(id: number): Observable<User> {
  
    return this.http.get<User>(API_URLS.USER_URL+`/users/${id}`);
  }
  
    getAllClients() {
      const head = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.user.getToken(),
        }),
      };
      return this.http.get<Array<Client>>(`${this.url}/clients`, head);
    }
    lockClient(client: Client) {
      const head = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.user.getToken(),
        }),
      };
      const c={
        email:client.email,
        nom:client.nom,
        prenom:client.prenom
      };
      return this.http.put(`${this.url}/admin/lock_user`, c,head);
    }
    unlockClient(client: Client) {
      const head = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.user.getToken(),
        }),
      };
      const c={
        email:client.email,
        nom:client.nom,
        prenom:client.prenom
      };
      return this.http.put(`${this.url}/admin/unlock_user`, c,head);
    }
  
  
}