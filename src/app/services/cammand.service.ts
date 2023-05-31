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
export class CammandService {

 constructor(private http: HttpClient){


 }
 getAllCammands(): Observable<any>{
   return  this.http.get(API_URLS.CAMMANDS_URL+`/admin/commands`);  
 }
 addCammand(command: Command, payed: boolean): Observable<Supply> {
    return this.http.post<Command>(API_URLS.CAMMANDS_URL+ `/admin/addition/${payed}`, command); 
  }

  editCammand(cammand: Command, id: number): Observable<User> {
    return this.http.put<Command>(API_URLS.CAMMANDS_URL+`/admin/update/`+id, cammand); 
  }

  deleteCommand(id: number): Observable<Command> {
    return this.http.delete<Command>(API_URLS.CAMMANDS_URL+`/admin/delete/${id}`); 
  } 

  getAllCommandsThatAreWaitingForPayment(): Observable<any>{
    return  this.http.get(API_URLS.CAMMANDS_URL+`/admin/commands_that_are_waiting_for_payment`);  
  }
  getAllCommandsThatArePayedWaitingForDelivery():Observable<any>{
    return  this.http.get(API_URLS.CAMMANDS_URL+`/admin/commands_that_are_payed_waiting_for_delivery`);  
  }
  getAllCommandsThatArePayedAndDelivered():Observable<any>{
    return  this.http.get(API_URLS.CAMMANDS_URL+`/admin/commands_that_are_payed_and_delivered`);  
  }
  getAllCommandsOfAUser():Observable<any>{
    return  this.http.get(API_URLS.CAMMANDS_URL+`/client/my_commands`);  
  }
}