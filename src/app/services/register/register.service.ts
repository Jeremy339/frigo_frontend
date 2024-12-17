import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/usuarios'; // La URL de tu API para crear usuarios

  constructor(private http: HttpClient) { }

  // Método para crear un usuario
  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}