import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  constructor(private router: Router) {}

  // Función para navegar a la página de reportes
  navigateToReports(): void {
    this.router.navigate(['/tickets']); // Redirige a la ruta de tickets
  }

  // Función para navegar a la página de equipos
  navigateToEquipos(): void {
    this.router.navigate(['/equipos']); // Redirige a la ruta de equipos
  }

}
