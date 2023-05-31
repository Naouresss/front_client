import { Injectable } from '@angular/core';
import { CurrentUser, LoginUser } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private url: string = "http://localhost:8090/api/user";
  private sessionTokenName = "Token";
  constructor(private http: HttpClient) { }
  registerToken(token: string) {
    sessionStorage.setItem(this.sessionTokenName, token);
  }
  removeToken() {
    sessionStorage.removeItem(this.sessionTokenName);
  }
  login(user: LoginUser) {
    return this.http.post(`${this.url}/login`, user, {
      responseType: 'text'
    });
  }
  getCurrentUser() {
    let token: any = sessionStorage.getItem(this.sessionTokenName) || null;
    let currentUser: CurrentUser = {} as CurrentUser;
    if (token != null) {
      let decoder = new JwtHelperService();
      let decodedToken = decoder.decodeToken(token);
      currentUser.email = decodedToken.sub;
      currentUser.firstName = decodedToken.prenom;
      currentUser.lastName = decodedToken.nom;
      currentUser.role = decodedToken.role;
    }
    return currentUser;
    //let user=decoder.getAuthScheme();
  }
  isAuthenticated() {
    return sessionStorage.getItem(this.sessionTokenName) != undefined;
  }
  getToken(){
    return sessionStorage.getItem(this.sessionTokenName);
  }
}
