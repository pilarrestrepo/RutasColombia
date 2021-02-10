import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequireMatch as RequireMatch } from '../util/requireMatch';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DepartamentosService } from 'app/services/departamentos.service';
import { SitiosCategoriasService } from 'app/services/sitios-categorias.service';
import { SitiosEmpresasService } from 'app/services/sitios-empresas.service';

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

  form: FormGroup;

  formControlDepartamento = new FormControl();
  public departamentos = [];
  departamentosFiltrados: Observable<string[]>;

  formControlCiudad = new FormControl();
  public ciudades = [];
  ciudadesFiltradas: Observable<string[]>;


  formControlSitioCategoria = new FormControl();
  public sitiosCategorias = [];
  sitiosCategoriasFiltradas: Observable<string[]>;

  formControlSitioEmpresa = new FormControl();
  public sitiosEmpresas = [];
  sitiosEmpresasFiltradas: Observable<string[]>;

  constructor(private departamentosService: DepartamentosService,
    private sitiosCategoriasService: SitiosCategoriasService,
    private sitiosEmpresasService: SitiosEmpresasService
    ) {

  }

  ngOnInit() {
    this.agregarValidadores();
    this.listarDepartamentos();
    this.listarSitiosCategorias();
    this.listarSitiosEmpresas();
  }
  private agregarValidadores() {
    this.form = new FormGroup({
      formControlDepartamento: new FormControl('', [Validators.required, RequireMatch]),
      formControlCiudad: new FormControl('', [Validators.required, RequireMatch]),
      formControlSitioCategoria: new FormControl('', [Validators.required, RequireMatch]),
      formControlSitioEmpresa: new FormControl('', [Validators.required, RequireMatch])      
    });
  }

  /**Departamentos */
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

  private filtrarDepartamentos() {
    this.departamentosFiltrados = this.formControlDepartamento.valueChanges
      .pipe(
        startWith(''),
        map(valor => this.filtrarListaDepartamentos(valor, this.departamentos))
      );
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

  /**Ciudades */
  public cargarCiudades(val: any) {
    this.ciudades = val.option.value.municipios;
    this.formControlCiudad.reset();
    this.filtrarCiudades();
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
      if (value) {
        val = value.nombre.toLowerCase();
      }
    }
    const filterValue = val;
    return lista.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }
  seleccionarCiudad(ciudad?: any): string | undefined {
    return ciudad ? ciudad.nombre : undefined;
  }

  /**SitiosCategorias */
  listarSitiosCategorias() {
    this.error = "";
    this.cargando = true;
    this.sitiosCategoriasService.listarSitiosCategorias()
      .subscribe(
        data => {
          this.sitiosCategorias = JSON.parse(JSON.stringify(data));
          this.filtrarSitiosCategorias();
          this.cargando = false;
        },
        error => {
          this.cargando = false;
          this.error = error;
        });
  }

  private filtrarSitiosCategorias() {
    this.sitiosCategoriasFiltradas = this.formControlSitioCategoria.valueChanges
      .pipe(
        startWith(''),
        map(valor => this.filtrarListaSitiosCategorias(valor, this.sitiosCategorias))
      );
  }
  private filtrarListaSitiosCategorias(value: any, lista: any[]): string[] {
    let val = "";
    if (typeof value === "string") {
      val = value.toLowerCase();
    } else {
      val = value.nombre.toLowerCase();
    }
    const filterValue = val;
    return lista.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }
  seleccionarSitioCategoria(sitioCategoria?: any): string | undefined {
    return sitioCategoria ? sitioCategoria.nombre : undefined;
  }
  /**SitiosEmpresas */
  listarSitiosEmpresas() {
    this.error = "";
    this.cargando = true;
    this.sitiosEmpresasService.listarSitiosEmpresas()
      .subscribe(
        data => {
          this.sitiosEmpresas = JSON.parse(JSON.stringify(data));
          this.filtrarSitiosEmpresas();
          this.cargando = false;
        },
        error => {
          this.cargando = false;
          this.error = error;
        });
  }

  private filtrarSitiosEmpresas() {
    this.sitiosEmpresasFiltradas = this.formControlSitioEmpresa.valueChanges
      .pipe(
        startWith(''),
        map(valor => this.filtrarListaSitiosEmpresas(valor, this.sitiosEmpresas))
      );
  }
  private filtrarListaSitiosEmpresas(value: any, lista: any[]): string[] {
    let val = "";
    if (typeof value === "string") {
      val = value.toLowerCase();
    } else {
      val = value.nombre.toLowerCase();
    }
    const filterValue = val;
    return lista.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }
  seleccionarSitioEmpresa(sitioEmpresa?: any): string | undefined {
    return sitioEmpresa ? sitioEmpresa.nombre : undefined;
  }
}

