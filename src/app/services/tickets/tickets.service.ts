import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Definir la interfaz Usuario
export interface Usuario {
  usuario_id: number;
  nombre: string;
  correo: string;
  password: string;
  direccion: string;
  telefono: string;
}

// Definir la interfaz Ticket
export interface Ticket {
  ticket_id?: number;
  descripcion: string;
  prioridad: string;
  estado: string;
  fecha_creacion?: string;
  usuario: Usuario;  // Cambiado de usuario_id a un objeto completo de Usuario
}

// Respuesta de eliminar ticket
interface DeleteResponse {
  message: string;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private apiUrl = 'http://localhost:3000/tickets'; // URL del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los tickets
  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}`).pipe(
      catchError(error => {
        console.error('Error al obtener los tickets:', error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }

  // Crear un nuevo ticket
  createTicket(ticket: Ticket): Observable<Ticket | null> {
    return this.http.post<Ticket>(`${this.apiUrl}`, ticket).pipe(
      catchError(error => {
        console.error('Error al crear el ticket:', error);
        return of(null); // Devuelve null en caso de error
      })
    );
  }

  // Eliminar un ticket por ID
  deleteTicket(id: number): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar el ticket:', error);
        return of({ message: 'Error al eliminar el ticket' });
      })
    );
  }
}
