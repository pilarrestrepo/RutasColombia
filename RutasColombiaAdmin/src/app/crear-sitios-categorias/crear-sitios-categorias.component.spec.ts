import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSitiosCategoriasComponent } from './crear-sitios-categorias.component';

describe('CrearSitiosCategoriasComponent', () => {
  let component: CrearSitiosCategoriasComponent;
  let fixture: ComponentFixture<CrearSitiosCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSitiosCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSitiosCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
