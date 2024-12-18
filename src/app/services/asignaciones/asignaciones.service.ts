import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {

  private apiUrl = 'http://localhost:3000/asignaciones'; // URL de la API de asignaciones
  private informesServicioUrl = 'http://localhost:3000/informes-servicio'; // URL de la API de informes de servicio

  constructor(private http: HttpClient) { }

  // Obtener todos los informes de servicio
  getInformesServicios(): Observable<any[]> {
    return this.http.get<any[]>(this.informesServicioUrl);
  }

  // Crear una nueva asignación
  createAsignacion(asignacion: any): Observable<any> {
    return this.http.post(this.apiUrl, asignacion);
  }

  // Obtener todas las asignaciones
  getAsignaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Utilizamos la URL de asignaciones
  }

  // Eliminar una asignación
  deleteAsignacion(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;  // Formato de la URL para eliminar por id
    return this.http.delete(url);
  }
}
