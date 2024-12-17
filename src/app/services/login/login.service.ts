import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient) {}

  // Método para hacer login
  login(correo: string, password: string): Observable<any> {
    const body = {
      correo: correo,
      password: password
    };
    return this.http.post<any>(this.apiUrl, body);
  }
}
