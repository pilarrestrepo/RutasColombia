import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSitiosEmpresasComponent } from './listar-sitios-empresas.component';

describe('ListarSitiosEmpresasComponent', () => {
  let component: ListarSitiosEmpresasComponent;
  let fixture: ComponentFixture<ListarSitiosEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSitiosEmpresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSitiosEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
