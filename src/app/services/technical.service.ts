import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Technical } from '../models/technical';


@Injectable({
  providedIn: 'root'
})
export class TechnicalService {

  constructor( private http: HttpClient) {

   }

   findById(id: any): Observable<Technical>{
    return this.http.get<Technical>(`${API_CONFIG.baseUrl}/technicals/${id}`);

   }

     findAll(): Observable<Technical[]>{
    return this.http.get<Technical[]>(`${API_CONFIG.baseUrl}/technicals`);
    
    }
    create(technical: Technical): Observable<Technical>{
      return this.http.post<Technical>(`${API_CONFIG.baseUrl}/technicals`, technical);
    }

    update(technical: Technical): Observable<Technical>{
      return this.http.put<Technical>(`${API_CONFIG.baseUrl}/technicals/${technical.id}`, technical);
    }

    delete(id: any): Observable<Technical>{
      return this.http.delete<Technical>(`${API_CONFIG.baseUrl}/technicals/${id}`);
    }


    
  }
