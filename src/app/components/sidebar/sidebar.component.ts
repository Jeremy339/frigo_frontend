import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faTicketAlt, faTasks, faCogs, faFileAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Importamos Router

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
})
export class SidebarComponent {
  faHome = faHome;
  faTicketAlt = faTicketAlt;
  faTasks = faTasks;
  faCogs = faCogs;
  faFileAlt = faFileAlt;
  faSignOutAlt = faSignOutAlt; // Icono de cerrar sesión

  constructor(private router: Router) {} // Inyectamos Router

  // Método para manejar el cierre de sesión
  logout() {
    // Aquí podrías manejar la lógica de cerrar sesión, como limpiar tokens, etc.
    // Luego rediriges a la página de login
    this.router.navigate(['/login']);
  }
}
