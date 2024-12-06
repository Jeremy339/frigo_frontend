import { Routes } from '@angular/router';
import { TicketsComponent } from './componets/tickets/tickets.component';
import { UsuariosComponent } from './componets/usuarios/usuarios.component';
import { InformeServicioComponent } from './componets/informe-servicio/informe-servicio.component';
import { EquiposComponent } from './componets/equipos/equipos.component';


export const routes: Routes = [
  { path: 'tickets', component: TicketsComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'informe-servicio', component: InformeServicioComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: '', redirectTo: '/tickets', pathMatch: 'full' }  // Ruta predeterminada
];
