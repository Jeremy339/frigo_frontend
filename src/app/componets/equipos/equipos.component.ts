import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.equipmentForm = this.fb.group({
      area: [''],
      descripcion: [''],
      marca: [''],
      modelo: [''],
      serie: [''],
      tipoCapacidad: [''],
      refrigeracion: [''],
      psi: [''],
      volts: [''],
      amp: [''],
      image: [''] // Campo para la imagen
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  // Manejo de la imagen seleccionada
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;  // Guardamos la imagen como base64
        this.equipmentForm.patchValue({ image: reader.result }); // Actualizamos el formulario con la imagen
      };
      reader.readAsDataURL(file);
    }
  }

  // Agregar equipo a la lista
  addEquipment() {
    if (this.equipmentForm.valid) {
      const formData = this.equipmentForm.value;
      this.equipmentList.push(formData);
      this.equipmentForm.reset();
      this.imagePreview = null; // Limpiamos la vista previa de la imagen
    }
  }
}
