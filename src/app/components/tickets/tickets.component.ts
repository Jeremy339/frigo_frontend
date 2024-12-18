import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { Ticket, TicketsService } from '../../services/tickets/tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TicketsService]
})
export class TicketsComponent {
  ticketForm: FormGroup;
  ticketsList: Ticket[] = [];  // Definir la lista de tickets con tipo Ticket

  constructor(private fb: FormBuilder, private ticketsService: TicketsService) {
    this.ticketForm = this.fb.group({
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      prioridad: ['', Validators.required],
      usuario_id: ['', Validators.required],
      fecha_creacion: ['', Validators.required],
    });

    // Cargar los tickets existentes al iniciar el componente
    this.loadTickets();
  }

  // Método para cargar los tickets desde el backend
  loadTickets() {
    this.ticketsService.getAllTickets().subscribe((tickets: Ticket[]) => {
      this.ticketsList = tickets;
    });
  }

  // Método para agregar un ticket
  addTicket() {
    if (this.ticketForm.valid) {
      const ticketData = this.ticketForm.value;

      this.ticketsService.createTicket(ticketData).subscribe({
        next: (response: Ticket | null) => {
          if (response) {
            // Solo agregar el ticket a la lista si la respuesta no es null
            this.ticketsList.push(response);  // Agregar el ticket a la lista
            this.ticketForm.reset();
            Swal.fire({
              icon: 'success',
              title: 'Ticket agregado',
              text: 'El ticket se ha agregado correctamente.',
            });
          } else {
            // Si la respuesta es null, mostrar un mensaje de error
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo agregar el ticket. Intenta de nuevo.',
            });
          }
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo agregar el ticket. Intenta de nuevo.',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor complete todos los campos antes de agregar el ticket.',
      });
    }
  }

  // Método para eliminar un ticket
  deleteTicket(index: number, ticketId: number | undefined): void {
    // Verificar que ticketId no sea undefined
    if (ticketId !== undefined) {
      this.ticketsService.deleteTicket(ticketId).subscribe({
        next: () => {
          this.ticketsList.splice(index, 1); // Elimina el ticket de la lista en el índice correspondiente
          Swal.fire({
            icon: 'info',
            title: 'Ticket eliminado',
            text: 'El ticket ha sido eliminado.',
          });
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el ticket. Intenta de nuevo.',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID de ticket no válido.',
      });
    }
  }
}
