import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';  // Importa Router
import { LoginService } from '../../services/login/login.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  // Asegúrate de importar ReactiveFormsModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,  // Asegúrate de importar CommonModule
    ReactiveFormsModule  // Asegúrate de importar ReactiveFormsModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  // Inyecta el servicio Router
  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService,
    private router: Router  // Asegúrate de inyectar el servicio Router aquí
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]], // Validación de correo
      password: ['', [Validators.required, Validators.minLength(6)]] // Validación de contraseña
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const correo = this.loginForm.get('correo')?.value;
      const password = this.loginForm.get('password')?.value;
  
      this.loginService.login(correo, password).subscribe({
        next: (response) => {
          console.log(response);  // Para verificar la respuesta en la consola
  
          if (response && response.access_token) {
            // Almacenar el token en localStorage
            localStorage.setItem('access_token', response.access_token);
            
            Swal.fire({
              icon: 'success',
              title: '¡Bienvenido!',
              text: 'Inicio de sesión exitoso.'
            });
  
            // Redirigir a la página de inicio
            this.router.navigate(['/inicio']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Correo o contraseña incorrectos.'
            });
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema con el servidor. Intenta de nuevo más tarde.'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, llena todos los campos correctamente.'
      });
    }
  }
}  