import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component'; // Importa el componente de sidebar

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, SidebarComponent],  // Asegúrate de importar CommonModule y SidebarComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSidebar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      if (this.router.url === '/login' || this.router.url === '/register') {
        this.showSidebar = false;
      } else {
        this.showSidebar = true;
      }
    });
  }
}
