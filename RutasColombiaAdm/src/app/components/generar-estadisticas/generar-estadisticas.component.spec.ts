import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarEstadisticasComponent } from './generar-estadisticas.component';

describe('GenerarEstadisticasComponent', () => {
  let component: GenerarEstadisticasComponent;
  let fixture: ComponentFixture<GenerarEstadisticasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarEstadisticasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
