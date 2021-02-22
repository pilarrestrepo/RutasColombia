import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSitiosEmpresasComponent } from './crear-sitios-empresas.component';

describe('CrearSitiosEmpresasComponent', () => {
  let component: CrearSitiosEmpresasComponent;
  let fixture: ComponentFixture<CrearSitiosEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSitiosEmpresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSitiosEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
