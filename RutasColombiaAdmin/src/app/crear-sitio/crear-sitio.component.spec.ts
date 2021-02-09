import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSitioComponent } from './crear-sitio.component';

describe('CrearSitioComponent', () => {
  let component: CrearSitioComponent;
  let fixture: ComponentFixture<CrearSitioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSitioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSitioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
