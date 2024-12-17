import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Asegúrate de que HttpClient esté importado
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Asegúrate de que el servicio esté disponible globalmente
})
export class EquiposService {

  private apiUrl = 'http://localhost:3000/equipos';  // URL de tu backend

  constructor(private http: HttpClient) { }  // Inyección de HttpClient

  crearEquipo(equipo: any): Observable<any> {
    return this.http.post(this.apiUrl, equipo);  // Realiza la solicitud POST
  }
}
