import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RequireMatch as RequireMatch } from '../util/requireMatch';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DepartamentosService } from 'app/services/departamentos.service';
import { SitiosCategoriasService } from 'app/services/sitios-categorias.service';
import { SitiosEmpresasService } from 'app/services/sitios-empresas.service';
import { ViewChild } from '@angular/core';
import { NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { SitiosService } from 'app/services/sitios.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { imagenSitioComponent } from './imagen-sitio.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-crear-sitio',
  templateUrl: './crear-sitio.component.html',
  styleUrls: ['./crear-sitio.component.css']
})
export class CrearSitioComponent implements OnInit {

  public id = null;
  public sitio = null;
  public model = {
    "id": null,
    "nombre": null,
    "direccion": null,
    "telefono": null,
    "categoria": null,
    "empresa": null,
    "municipio": null,
    "URLWeb": null,
    "URLContacto": null,
    "URLRelacionada": null,
    "correo": null,
    "activo": true,
    "punto": {
      "latitud": null,
      "longitud": null,
      "altitud": null
    },
    "nombreArchivo": null,
    "urlImagen": null,
    "imagenb64": null,
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

    }
  }
  public nombreactivo = "Activo";
  public direccionBuscar = "";
  public error = "";
  public cargando = false;
  public lat = 0;
  public lng = 0;
  public zoom = 15;
  private geoCoder;

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


  @ViewChild('buscarSitio') public buscarSitioElementRef: ElementRef;

  constructor(private departamentosService: DepartamentosService,
    private sitiosCategoriasService: SitiosCategoriasService,
    private sitiosEmpresasService: SitiosEmpresasService,
    private sitiosService: SitiosService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get("id")
    })


  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.obterUbicacionActual();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.buscarSitioElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.model.punto.latitud = this.lat;
          this.model.punto.longitud = this.lng;
          this.zoom = 15;
        });
      });

    });
    this.agregarValidadores();
    this.listarDepartamentos();

  }
  private obterUbicacionActual() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  /*
    obterDireccion(latitude, longitude) {    
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {          
            this.zoom = 15;                      
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
  
      });
    }
    */
  private agregarValidadores() {
    this.form = new FormGroup({
      formControlNombre: new FormControl('', [Validators.required]),
      formControlDepartamento: new FormControl('', [Validators.required, RequireMatch]),
      formControlCiudad: new FormControl('', [Validators.required, RequireMatch]),
      formControlSitioCategoria: new FormControl('', [Validators.required, RequireMatch]),
      formControlSitioEmpresa: new FormControl('', [Validators.required, RequireMatch])
    });
  }
  mapClicked(map: any) {
    map.addListener('click', (e) => {
      this.lat = e.latLng.lat();
      this.lng = e.latLng.lng();
      this.model.punto.latitud = this.lat;
      this.model.punto.longitud = this.lng;
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
          this.listarSitiosCategorias();
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
  public seleccionarItemCiudad(val: any) {
    this.model.municipio = val.option.value.id;

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
          this.listarSitiosEmpresas();
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
  public seleccionarItemCategoria(val: any) {
    this.model.categoria = val.option.value.id;

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
          if (this.id != "0") {
            this.obtenerSitio();
          }
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
  public seleccionarItemEmpresa(val: any) {
    this.model.empresa = val.option.value.id;

  }
  /**Archivo */
  eventoSeleccionarArchivo(evt) {
    this.model.nombreArchivo = evt.target.files[0].name;
    this.convertirArchivoBase64(evt.target.files[0]);
  }
  convertirArchivoBase64(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.model.imagenb64 = reader.result;
    };
  }
  /**Sitios */
  obtenerSitio() {
    this.sitiosService.obtenerSitio(this.id)
      .subscribe(res => {
        this.sitio = JSON.parse(JSON.stringify(res));
        console.log('respuesta obtenerSitio', this.sitio);
        this.asignarSitioModel();
      }, err => {
        console.log('error respuesta obtenerSitio', err);
      })
  }
  guardarSitio() {
    if (!this.model.id) {
      this.crearSitio();
    } else {
      this.editarSitio();
    }
  }
  crearSitio() {
    this.sitiosService.crearSitio(this.model)
      .subscribe(res => {
        console.log('respuesta property', res);
      }, err => {
        console.log('error respuesta sitios', err);
      })
  }
  editarSitio() {
    this.sitiosService.editarSitio(this.model)
      .subscribe(res => {
        console.log('respuesta property', res);
      }, err => {
        console.log('error respuesta sitios', err);
      })
  }
  asignarSitioModel() {

    this.model.id = this.sitio.id
    this.model.nombre = this.sitio.nombre
    this.model.direccion = this.sitio.direccion
    this.model.telefono = this.sitio.telefono
    if (this.sitio.categoria) {
      this.model.categoria = this.sitio.categoria.id
    }
    if (this.sitio.empresa) {
      this.model.empresa = this.sitio.empresa.id
    }
    if (this.sitio.municipio) {
      this.model.municipio = this.sitio.municipio.id
    }
    this.model.URLWeb = this.sitio.URLWeb
    this.model.URLContacto = this.sitio.URLContacto
    this.model.URLRelacionada = this.sitio.URLRelacionada
    this.model.correo = this.sitio.correo
    this.model.activo = this.sitio.activo
    this.model.punto = this.sitio.punto

    /*: {
        latitud = this.sitio.
        longitud = this.sitio.
        altitud = this.model.
      },*/
    this.model.nombreArchivo = this.sitio.nombreArchivo
    this.model.urlImagen = this.sitio.urlImagen
    this.model.imagenb64 = this.sitio.imagenb64
    this.model.idiomas = this.sitio.idiomas
    /*: {
      es:
      {
        nombre = this.sitio.
        descripcion = this.model.
      },
      en:
      {
        nombre = this.sitio.
        descripcion = this.model.
      }
 
    }*/
    if (this.sitio.categoria) {
      this.formControlSitioCategoria.setValue(this.sitio.categoria)
    }
    if (this.sitio.empresa) {
      this.formControlSitioEmpresa.setValue(this.sitio.empresa)
    }
    if (this.sitio.municipio) {
      this.formControlDepartamento.setValue(this.sitio.municipio.departamento)
      this.formControlCiudad.setValue(this.sitio.municipio)
    }
    console.log("asignarSitioModel", this.model, this.sitio, this.sitiosCategorias)

  }
  verImagen() {
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      urlImagen: environment.baseUrl + this.sitio.urlImagen,
      titulo: 'Imagen: ' + this.sitio.nombreArchivo
    };
    const dialogRef = this.dialog.open(imagenSitioComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

