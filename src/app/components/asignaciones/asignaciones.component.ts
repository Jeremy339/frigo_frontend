import { Component, OnInit } from '@angular/core';
import { AsignacionesService } from '../../services/asignaciones/asignaciones.service'; // Servicio para asignaciones
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Formularios
import { CommonModule } from '@angular/common';  // Directivas comunes como ngFor
import { HttpClientModule } from '@angular/common/http';  // Módulo para hacer peticiones HTTP

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.scss'],
  standalone: true,
  imports: [
    CommonModule,           // Necesario para ngFor y otras directivas comunes
    FormsModule,            // Necesario para ngModel
    ReactiveFormsModule,    // Necesario si estás usando formularios reactivos
    HttpClientModule        // Necesario para hacer peticiones HTTP
  ]
})
export class AsignacionesComponent implements OnInit {
  asignaciones: any[] = []; // Lista de asignaciones
  asignacion: any = {}; // Objeto para manejar los datos de una asignación
  informesServicios: any[] = []; // Lista de informes de servicios (agregada)

  constructor(private asignacionesService: AsignacionesService) {}

  ngOnInit(): void {
    this.getAsignaciones(); // Obtener las asignaciones al iniciar el componente
    this.getInformesServicios(); // Obtener los informes de servicios
  }

  // Obtener todas las asignaciones
  getAsignaciones(): void {
    this.asignacionesService.getAsignaciones().subscribe(data => {
      this.asignaciones = data; // Asignar las asignaciones recibidas
    });
  }

  // Obtener todos los informes de servicios
  getInformesServicios(): void {
    this.asignacionesService.getInformesServicios().subscribe(data => {
      this.informesServicios = data; // Asignar los informes de servicios
    });
  }

  // Crear o actualizar una asignación
  onSubmit(): void {
    if (this.asignacion.asignacion_id) {
      // Si tiene asignacion_id, se actualiza
      this.asignacionesService.updateAsignacion(this.asignacion).subscribe(() => {
        this.getAsignaciones(); // Refrescar la lista
        this.asignacion = {}; // Limpiar el formulario
      });
    } else {
      // Si no tiene asignacion_id, es una nueva asignación
      this.asignacionesService.createAsignacion(this.asignacion).subscribe(() => {
        this.getAsignaciones(); // Refrescar la lista
        this.asignacion = {}; // Limpiar el formulario
      });
    }
  }

  // Editar una asignación
  editAsignacion(asignacion: any): void {
    this.asignacion = { ...asignacion }; // Copiar los datos de la asignación a editar
  }

  // Eliminar una asignación
  deleteAsignacion(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta asignación?')) {
      this.asignacionesService.deleteAsignacion(id).subscribe(() => {
        this.getAsignaciones(); // Refrescar la lista
      });
    }
  }
}
