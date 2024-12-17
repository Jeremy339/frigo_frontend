import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquiposService } from '../../services/equipos/equipos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule //importar ReactiveFormsModule
  ]
})
export class EquiposComponent {
  equipmentForm: FormGroup;
  equipmentList: any[] = [];
  showForm: boolean = false;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder, private equiposService: EquiposService) {  
    this.equipmentForm = this.fb.group({
      area: ['', Validators.required],  // Campo obligatorio
      descripcion: ['', Validators.required],  // Campo obligatorio
      marca: ['', Validators.required],  // Campo obligatorio
      modelo: ['', Validators.required],  // Campo obligatorio
      serie: ['', Validators.required],  // Campo obligatorio
      tipo: ['', Validators.required],  // Campo obligatorio
      capacidad: ['', Validators.required],  // Campo obligatorio
      refrigeracion: ['', Validators.required],  // Campo obligatorio
      psi: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],  // Campo obligatorio, solo números
      volts: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],  // Campo obligatorio, solo números
      amp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],  // Campo obligatorio, solo números
      image: [''] // Imagen (no obligatorio)
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.equipmentForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  // Modificación de la función para enviar el equipo al backend
  addEquipment() {
    if (this.equipmentForm.valid) {
      const formData = this.equipmentForm.value;

      this.equiposService.crearEquipo(formData).subscribe(
        (response) => {
          console.log('Equipo creado con éxito:', response);
          this.equipmentList.push(response);
          this.equipmentForm.reset();
          this.imagePreview = null;

          Swal.fire({
            title: '¡Éxito!',
            text: 'El equipo ha sido creado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        },
        (error) => {
          console.error('Error al crear equipo:', error);

          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al crear el equipo. Intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    } else {
      // Si el formulario no es válido, mostrar un mensaje de advertencia
      Swal.fire({
        title: 'Advertencia',
        text: 'Por favor, completa todos los campos del formulario.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
