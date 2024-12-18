import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InformeServicioService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Obtener lista de equipos
  getEquipos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/equipos`);
  }

  // Obtener lista de asignaciones de materiales
  getMateriales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/asignacion-material`);
  }

  // Agregar un nuevo informe
  agregarInforme(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/informes-servicio`, data);
  }

   // Obtener lista de asignaciones de materiales
   getInformes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/informes-servicio`);
  }

  // Obtener lista de asignaciones de materiales
  deleteInforme(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/informes-servicio/${id}`);
  }
}
