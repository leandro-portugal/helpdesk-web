import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor( private http: HttpClient) { }

  findAll(): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(`${API_CONFIG.baseUrl}/tickets`);
  }
}
