import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // Importar HttpClientModule
import { routes } from './app.routes';  // Aquí se importa correctamente 'routes'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),  // Usando 'routes' aquí
    provideClientHydration(withEventReplay()),
    provideHttpClient(),  // Agregar HttpClient aquí
  ]
};
