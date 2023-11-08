import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
//import { Observable } from 'rxjs';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient);
  private baseUrl: string;

  constructor() { 
    this.baseUrl='https://deportesextremosback.onrender.com';
  }

  register(formValue: any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/register`, formValue)
    )
  }

  login(formValue: any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, formValue)
    )
  }
}

