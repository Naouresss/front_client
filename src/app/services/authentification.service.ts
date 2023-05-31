import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registerrequest } from '../models/registerrequest';
import { Observable } from 'rxjs';
import { Authentificationrequest } from '../models/authentificationrequest';
import { Authentificationresponse } from '../models/authentificationresponse';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private apiUrl = 'http://localhost:8090/api/user';
  private authTokenKey = 'authToken';


  constructor(private http: HttpClient) { }

  register(registerRequest: Registerrequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register_client`, registerRequest);
  }

  authenticate(
    authenticationRequest: Authentificationrequest
  ): Observable<Authentificationresponse> {
    return this.http.post<Authentificationresponse>(
      `${this.apiUrl}/login`,
      authenticationRequest
    );
  }

  storeAuthToken(authToken: string): void {
    localStorage.setItem(this.authTokenKey, authToken);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }
  getCurrentUser(authToken: string | null): Observable<User> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + authToken
    );
    return this.http.get<User>(`${this.apiUrl}/current-user`, { headers });
  }

  
}
