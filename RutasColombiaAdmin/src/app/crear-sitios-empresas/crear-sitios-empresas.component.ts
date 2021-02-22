import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SitiosEmpresasService } from 'app/services/sitios-empresas.service';
import { ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crear-sitios-empresas',
  templateUrl: './crear-sitios-empresas.component.html',
  styleUrls: ['./crear-sitios-empresas.component.css']
})
export class CrearSitiosEmpresasComponent implements OnInit {
  public id = null;
  public empresa = null;
  public model = {
    "id": null,
    "nombre": null,
    "descripcion": null

  }
  public error = "";
  public cargando = false;
  form: FormGroup;


  @ViewChild('buscarSitio') public buscarSitioElementRef: ElementRef;
  constructor(private sitiosEmpresasService: SitiosEmpresasService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private location: Location
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get("id")
      if (this.id != "0") {
        this.obtenerSitioEmpresa();
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

  obtenerSitioEmpresa() {
    this.sitiosEmpresasService.obtenerSitioEmpresa(this.id)
      .subscribe(res => {
        this.empresa = JSON.parse(JSON.stringify(res));
        console.log('respuesta obtenerEmpresa', this.empresa);
        this.asignarEmpresaModel();
      }, err => {
        console.log('error respuesta obtenerEmpresa', err);
      })
  }

  public onCancel = () => {
    this.location.back();
  }

  public guardar = () => {
    if (this.form.valid) {
      this.guardarEmpresa();
    }
  }
  guardarEmpresa() {
    if (!this.model.id) {
      this.crearSitioEmpresa();
    } else {
      this.editarSitioEmpresa();
    }
    this.router.navigate(['/listar-empresas']);

  }
  crearSitioEmpresa() {
    this.sitiosEmpresasService.crearSitioEmpresa(this.model)
      .subscribe(res => {
        console.log('respuesta crearEmpresa', res);
      }, err => {
        console.log('error respuesta crearEmpresa', err);
      })
  }
  editarSitioEmpresa() {
    this.sitiosEmpresasService.editarSitioEmpresa(this.model)
      .subscribe(res => {
        console.log('respuesta editarEmpresa', res);
      }, err => {
        console.log('error respuesta editarEmpresa', err);
      })
  }
  asignarEmpresaModel() {
    this.model.id = this.empresa.id
    this.model.nombre = this.empresa.nombre
    this.model.descripcion = this.empresa.descripcion
  }


}
