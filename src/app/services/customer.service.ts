import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor( private http: HttpClient) {

   }

   findById(id: any): Observable<Customer>{
    return this.http.get<Customer>(`${API_CONFIG.baseUrl}/customers/${id}`);

   }

     findAll(): Observable<Customer[]>{
    return this.http.get<Customer[]>(`${API_CONFIG.baseUrl}/customers`);
    
    }
    create(customer: Customer): Observable<Customer>{
      return this.http.post<Customer>(`${API_CONFIG.baseUrl}/customers`, customer);
    }

    update(customer: Customer): Observable<Customer>{
      return this.http.put<Customer>(`${API_CONFIG.baseUrl}/customers/${customer.id}`, customer);
    }

    delete(id: any): Observable<Customer>{
      return this.http.delete<Customer>(`${API_CONFIG.baseUrl}/customers/${id}`);
    }


    
  }
