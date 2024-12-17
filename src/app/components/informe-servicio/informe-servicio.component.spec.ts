import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeServicioComponent } from './informe-servicio.component';

describe('InformeServicioComponent', () => {
  let component: InformeServicioComponent;
  let fixture: ComponentFixture<InformeServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformeServicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
