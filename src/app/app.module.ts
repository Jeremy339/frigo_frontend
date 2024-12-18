import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de que HttpClientModule esté importado
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';  // Asegúrate de que las rutas estén importadas

import { AppComponent } from './app.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { AsignacionesComponent } from './components/asignaciones/asignaciones.component';
import { InformeServicioComponent } from './components/informe-servicio/informe-servicio.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { SidebarComponent } from './components/sidebar/sidebar.component'; // Importa el SidebarComponent

@NgModule({
  declarations: [
    AsignacionesComponent,
    EquiposComponent,
    InformeServicioComponent,
    InicioComponent,
    LoginComponent,
    RegisterComponent,
    TicketsComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,  // Importa HttpClientModule aquí
    RouterModule.forRoot(routes),
  ],
})
export class AppModule { }
