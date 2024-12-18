import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { InformeServicioService } from '../../services/informe-servicio/informe-servicio.service';
import { CommonModule } from '@angular/common';


// Define el tipo para un informe
interface Informe {
  informe_servicio_id: number;
  usuario: { usuario_id: number };
  fecha: string;
  hora_ingreso: string;
  hora_salida: string;
  equipo: { modelo: string };
  descripcion_trabajo: string;
  asignacionMaterial: { cantidad_usada: number };
}

@Component({
  selector: 'app-informe-servicio',
  templateUrl: './informe-servicio.component.html',
  styleUrls: ['./informe-servicio.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class InformeServicioComponent implements OnInit {
  informeForm: FormGroup;
  informesList: any[] = [];
  equiposList: any[] = [];
  materialesList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private informeServicio: InformeServicioService
  ) {
    this.informeForm = this.fb.group({
      usuario: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora_ingreso: [''],
      hora_salida: [''],
      equipo: ['', [Validators.required]],
      descripcion_trabajo: ['', [Validators.required]],
      asignacionMaterial: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.cargarEquipos();
    this.cargarMateriales();
    this.cargarInformes();
  }

  // Cargar equipos desde el servicio
  cargarEquipos() {
    this.informeServicio.getEquipos().subscribe(
      (equipos) => {
        this.equiposList = equipos;
        console.log('Equipos cargados:', equipos); // Verificar datos en consola
      },
      (error) => {
        console.error('Error al cargar equipos:', error); // Log de error
        Swal.fire('Error', 'No se pudieron cargar los equipos', 'error');
      }
    );
  }

  // Cargar materiales desde el servicio
  cargarMateriales() {
    this.informeServicio.getMateriales().subscribe(
      (materiales) => {
        this.materialesList = materiales;
        console.log('Materiales cargados:', materiales); // Verificar datos en consola
      },
      (error) => {
        console.error('Error al cargar materiales:', error); // Log de error
        Swal.fire('Error', 'No se pudieron cargar los materiales', 'error');
      }
    );
  }

  // Agregar un nuevo informe
  agregarInforme() {
    if (this.informeForm.valid) {
      const formData = this.informeForm.value;

      this.informeServicio.agregarInforme(formData).subscribe(
        (response) => {
          this.informesList.push(response); // Agregar a la lista local
          this.informeForm.reset();
          Swal.fire('Éxito', 'Informe agregado correctamente', 'success');
        },
        (error) => {
          Swal.fire('Error', 'No se pudo agregar el informe', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios', 'error');
    }
  }

  // Eliminar un informe específico
  eliminarInforme(informe_servicio_id: number, index: number) {
    if (isNaN(informe_servicio_id)) {
      console.error('El ID del informe no es válido:', informe_servicio_id);
      Swal.fire('Error', 'ID del informe no válido', 'error');
      return;
    }
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.informeServicio.deleteInforme(informe_servicio_id).subscribe(
          () => {
            this.informesList.splice(index, 1);
            Swal.fire('Eliminado', 'El informe ha sido eliminado', 'info');
          },
          (error) => {
            Swal.fire('Error', 'No se pudo eliminar el informe', 'error');
          }
        );
      }
    });
  }
  // Cargar los informes desde el servicio
  cargarInformes() {
    this.informeServicio.getInformes().subscribe(
      (informes) => {
        this.informesList = informes;
        console.log('Informes cargados:', informes);
      },
      (error) => {
        console.error('Error al cargar informes:', error);
        Swal.fire('Error', 'No se pudieron cargar los informes', 'error');
      }
    );
  }
}
