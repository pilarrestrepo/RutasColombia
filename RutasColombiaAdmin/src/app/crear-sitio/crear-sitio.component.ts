import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartamentosService } from 'app/services/departamentos.service';
import { RequireMatch as RequireMatch } from '../util/requireMatch';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-crear-sitio',
  templateUrl: './crear-sitio.component.html',
  styleUrls: ['./crear-sitio.component.css']
})
export class CrearSitioComponent implements OnInit {
  public model = {
    "nombre": null,
    "direccion": null,
    "telefono": null,
    "categoria": null,
    "municipio": null,
    "punto": {
      "latitud": null,
      "longitud": null
    },
    "icono": null,
    "urlImagen": null,
    "url": null,
    "idiomas": {
      "es":
      {
        "nombre": null,
        "descripcion": null
      },
      "en":
      {
        "nombre": null,
        "descripcion": null
      }

    },
    "coordenadas": null
  }
  public error = "";
  public cargando = false;
  public departamentos = [];
  public ciudades = [];
  form: FormGroup;
  formControlDepartamento = new FormControl();
  formControlCiudad = new FormControl();
  ciudadesFiltradas: Observable<string[]>;
  departamentosFiltrados: Observable<string[]>;

  constructor(private departamentosService: DepartamentosService) {

  }
  listarDepartamentos() {    
    this.error = "";
    this.cargando = true;
    this.departamentosService.listarDepartamentos()
      .subscribe(
        data => {          
          this.departamentos = JSON.parse(JSON.stringify(data));          
          this.filtrarDepartamentos();
          this.cargando = false;
        },
        error => {
          this.cargando = false;
          this.error = error;
        });
  }
  ngOnInit() {
    this.listarDepartamentos();
    this.agregarValidadores();
  }
  private agregarValidadores() {
    this.form = new FormGroup({
      formControlDepartamento: new FormControl('', [Validators.required, RequireMatch]),
      formControlCiudad: new FormControl('', [Validators.required, RequireMatch]),
    }); 
  }
  private filtrarDepartamentos() {
    this.departamentosFiltrados = this.formControlDepartamento.valueChanges
      .pipe(
        startWith(''),
        map(valor => this.filtrarListaDepartamentos(valor, this.departamentos))
      );
  }
  private filtrarCiudades() {
    this.ciudadesFiltradas = this.formControlCiudad.valueChanges
      .pipe(
        startWith(''),
        map(valor => this.filtrarListaCiudades(valor, this.ciudades))
      );
  }
  private filtrarListaCiudades(value: any, lista: any[]): string[] {    
    let val = "";
    if (typeof value === "string") {
      val = value.toLowerCase();
    } else {
      if (value){
        val = value.nombre.toLowerCase();
      }      
    }
    const filterValue = val;
    return lista.filter(option => option.nombre.toLowerCase().includes(filterValue));

  }
  private filtrarListaDepartamentos(value: any, lista: any[]): string[] {
    let val = "";
    if (typeof value === "string") {
      val = value.toLowerCase();
    } else {
      val = value.nombre.toLowerCase();
    }
    const filterValue = val;
    return lista.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }
  seleccionarDepartamento(departamento?: any): string | undefined {
    return departamento ? departamento.nombre : undefined;
  }
  seleccionarCiudad(ciudad?: any): string | undefined {    
    return ciudad ? ciudad.nombre : undefined;
  }

  public cargarCiudades(val: any) {
    this.ciudades = val.option.value.municipios;
    this.formControlCiudad.reset(); 
    this.filtrarCiudades();
  }
}

