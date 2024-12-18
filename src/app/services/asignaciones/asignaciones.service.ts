import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {
  private apiUrl = 'http://localhost:3000';  // Cambia esta URL por la correcta

  constructor(private http: HttpClient) {}

  // Método para obtener todas las asignaciones
  getAsignaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/asignaciones`);
  }

  // Método para obtener todos los informes de servicios
  getInformesServicios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/informes-servicios`);  // Cambia esta URL por la correcta
  }

  // Método para crear una asignación
  createAsignacion(asignacion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/asignaciones`, asignacion);
  }

  // Método para actualizar una asignación
  updateAsignacion(asignacion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/asignaciones`, asignacion);
  }

  // Método para eliminar una asignación
  deleteAsignacion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/asignaciones/${id}`);
  }
}
