import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SitiosCategoriasService } from 'app/services/sitios-categorias.service';
import { ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { Location } from '@angular/common';
import { imagenCategoriaComponent } from './imagen-categoria.component';

@Component({
  selector: 'app-crear-sitios-categorias',
  templateUrl: './crear-sitios-categorias.component.html',
  styleUrls: ['./crear-sitios-categorias.component.css']
})
export class CrearSitiosCategoriasComponent implements OnInit {


  public id = null;
  public categoria = null;
  public model = {
    "id": null,
    "nombre": null,
    "descripcion": null,
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
  
  public urlImagen = "";
  public error = "";
  public cargando = false;

  form: FormGroup;
  

  @ViewChild('buscarSitio') public buscarSitioElementRef: ElementRef;
  constructor(private sitiosCategoriasService: SitiosCategoriasService,    
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private location: Location
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get("id")
      if (this.id != "0") {
        this.obtenerSitioCategoria();
      }
    })
  }

  ngOnInit() {
    this.agregarValidadores();
  }
  private agregarValidadores() {
    this.form = new FormGroup({
      formControlNombre: new FormControl('', [Validators.required]),
      formControlDescripcion: new FormControl()
    });
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
  obtenerSitioCategoria() {
    this.sitiosCategoriasService.obtenerSitioCategoria(this.id)
      .subscribe(res => {
        this.categoria = JSON.parse(JSON.stringify(res));
        console.log('respuesta obtenerCategoria', this.categoria);
        this.asignarCategoriaModel();
      }, err => {
        console.log('error respuesta obtenerCategoria', err);
      })
  }

  public onCancel = () => {
    this.location.back();
  }

  public guardar = () => {
    if (this.form.valid) {
      this.guardarCategoria();
    }
  }
  guardarCategoria() {
    if (!this.model.id) {
      this.crearSitioCategoria();
    } else {
      this.editarSitioCategoria();
    }
    this.router.navigate(['/listar-categorias']);

  }
  crearSitioCategoria() {
    this.sitiosCategoriasService.crearSitioCategoria(this.model)
      .subscribe(res => {
        console.log('respuesta crearCategoria', res);
      }, err => {
        console.log('error respuesta crearCategoria', err);
      })
  }
  editarSitioCategoria() {
    this.sitiosCategoriasService.editarSitioCategoria(this.model)
      .subscribe(res => {
        console.log('respuesta editarCategoria', res);
      }, err => {
        console.log('error respuesta editarCategoria', err);
      })
  }
  asignarCategoriaModel() {
    this.model.id = this.categoria.id
    this.model.nombre = this.categoria.nombre
    this.model.descripcion = this.categoria.descripcion
    this.model.nombreArchivo = this.categoria.nombreArchivo
    this.model.urlImagen = this.categoria.urlImagen
    this.model.imagenb64 = this.categoria.imagenb64
    this.model.idiomas = this.categoria.idiomas
    this.urlImagen= environment.baseUrl + this.categoria.urlImagen
  }
  verImagen() {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.height = '40%';

    dialogConfig.data = {
      urlImagen: environment.baseUrl + this.categoria.urlImagen,
      titulo: 'Imagen: ' + this.categoria.nombreArchivo
    };
    const dialogRef = this.dialog.open(imagenCategoriaComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
