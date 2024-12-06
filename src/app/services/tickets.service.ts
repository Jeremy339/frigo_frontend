import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private apiUrl = 'http://localhost:3000/tickets'; // Cambia el puerto según tu backend

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createTicket(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
