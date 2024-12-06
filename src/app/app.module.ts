import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Aquí importas FormsModule
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de importar HttpClientModule correctamente
import { RouterModule } from '@angular/router';  // Importamos RouterModule para las rutas

import { AppComponent } from './app.component';
import { TicketsComponent } from './componets/tickets/tickets.component';
import { InformeServicioComponent } from './componets/informe-servicio/informe-servicio.component';
import { EquiposComponent } from './componets/equipos/equipos.component';
import { routes } from './app.routes';  // Importamos las rutas directamente

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    InformeServicioComponent,
    EquiposComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,  // Asegúrate de que esté aquí
    RouterModule.forRoot(routes)  // Configuramos las rutas directamente aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
