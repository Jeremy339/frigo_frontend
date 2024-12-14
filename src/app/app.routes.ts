import { Routes } from '@angular/router';
import { TicketsComponent } from './components/tickets/tickets.component';
import { InformeServicioComponent } from './components/informe-servicio/informe-servicio.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { AsignacionesComponent } from './components/asignaciones/asignaciones.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


export const routes: Routes = [
  { path: 'asignaciones', component: AsignacionesComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'informe-servicio', component: InformeServicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }  // Ruta predeterminada
];
