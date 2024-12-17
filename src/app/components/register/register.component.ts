import { Component } from '@angular/core';
import { RegisterService } from '../../services/register/register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,  // Asegúrate de importar CommonModule
    FormsModule
  ]
})
export class RegisterComponent {
  user = {
    usuario_id: 0,
    nombre: '',
    correo: '',
    password: '',
    direccion: '',
    telefono: ''
  };

  constructor(private registerService: RegisterService) {}

  onSubmit() {
    // Asegurarse de que todos los valores sean del tipo correcto
    this.user.usuario_id = Number(this.user.usuario_id);  // Convertir a número
  
    // Verificar si algún campo está vacío o tiene espacios en blanco
    if (
      !this.user.usuario_id ||  // Ahora verificamos si es un número válido
      !this.user.nombre.trim() ||
      !this.user.correo.trim() ||
      !this.user.password.trim() ||
      !this.user.direccion.trim() ||
      !this.user.telefono.trim()
    ) {
      alert('Por favor, completa todos los campos correctamente.');
      return; // Evitar que el formulario se envíe
    }
  
    // Llamar al servicio para crear el usuario
    this.registerService.createUser(this.user).subscribe({
      next: (response) => {
        console.log('Usuario creado con éxito:', response);
        alert('Usuario registrado exitosamente');
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
        alert('Hubo un error al registrar al usuario');
      }
    });
  }
}