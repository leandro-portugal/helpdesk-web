import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  authenticate(credentials: Credentials) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, credentials, {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfulLogin(authorizationToken: string) {
    localStorage.setItem('authorization-token', authorizationToken);
  }

  isAuthenticated() {
    const token = localStorage.getItem('authorization-token');
    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }

  getName(): string {
    const token = localStorage.getItem('authorization-token');
    if (token) {
      return this.jwtService.decodeToken(token).iss;
    }
    return null;
  }

  
}
