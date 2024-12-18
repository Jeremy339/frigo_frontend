import { Component, OnInit } from '@angular/core';
import { AsignacionesService } from '../../services/asignaciones/asignaciones.service'; // Servicio para asignaciones
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Formularios
import { CommonModule } from '@angular/common';  // Directivas comunes como ngFor
import { HttpClientModule } from '@angular/common/http';  // Módulo para hacer peticiones HTTP
import Swal from 'sweetalert2';  // Importar SweetAlert2

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
  informesServicios: any[] = [];  // Array de los informes de servicio
  asignaciones: any[] = [];       // Lista de asignaciones
  asignacion: any = {             // Modelo de la asignación actual
    informeServicio: null,
    fecha_asignacion: '',
    estado: 'pendiente'            // Valor inicial del estado
  };

  constructor(private asignacionesService: AsignacionesService) {}

  ngOnInit(): void {
    // Cargar los informes de servicio al inicializar el componente
    this.cargarInformesServicios();
    // Cargar las asignaciones para mostrarlas en la tabla (si ya hay asignaciones)
    this.cargarAsignaciones();
  }

  // Método para cargar los informes de servicio
  cargarInformesServicios() {
    this.asignacionesService.getInformesServicios().subscribe(
      (data) => {
        console.log('Informes de servicio cargados:', data);
        this.informesServicios = data;  // Asigna los datos recibidos al array
      },
      (error) => {
        console.error('Error al cargar los informes de servicio', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los informes de servicio.'
        });
      }
    );
  }

  // Método para cargar las asignaciones
  cargarAsignaciones() {
    this.asignacionesService.getAsignaciones().subscribe(
      (data) => {
        console.log('Asignaciones cargadas:', data);
        this.asignaciones = data;  // Asigna las asignaciones al array
      },
      (error) => {
        console.error('Error al cargar las asignaciones', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las asignaciones.'
        });
      }
    );
  }

  // Método para enviar la asignación
  onSubmit() {
    this.asignacionesService.createAsignacion(this.asignacion).subscribe(
      (response) => {
        console.log('Asignación creada con éxito', response);
        // Alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Asignación creada',
          text: 'La asignación se creó correctamente.'
        }).then(() => {
          // Después de la alerta, recargar la lista de asignaciones
          this.cargarAsignaciones();
        });
      },
      (error) => {
        console.error('Error al crear la asignación', error);
        // Alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear la asignación.'
        });
      }
    );
  }

  // Método para eliminar una asignación
  deleteAsignacion(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarla'
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignacionesService.deleteAsignacion(id).subscribe(
          (response) => {
            console.log('Asignación eliminada con éxito', response);
            // Alerta de éxito
            Swal.fire({
              icon: 'success',
              title: 'Asignación eliminada',
              text: 'La asignación fue eliminada correctamente.'
            }).then(() => {
              // Recargar la lista de asignaciones después de eliminar una
              this.cargarAsignaciones();
            });
          },
          (error) => {
            console.error('Error al eliminar la asignación', error);
            // Alerta de error
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la asignación.'
            });
          }
        );
      }
    });
  }
}
