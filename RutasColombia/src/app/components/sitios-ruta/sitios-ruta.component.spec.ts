import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitiosRutaComponent } from './sitios-ruta.component';

describe('SitiosRutaComponent', () => {
  let component: SitiosRutaComponent;
  let fixture: ComponentFixture<SitiosRutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitiosRutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitiosRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
