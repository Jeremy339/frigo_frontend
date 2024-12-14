import { TestBed } from '@angular/core/testing';

import { InformeServicioService } from './informe-servicio.service';

describe('InformeServicioService', () => {
  let service: InformeServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformeServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
