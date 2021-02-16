import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";



@Component({
  selector: 'imagen-sitio',
  templateUrl: 'imagen-sitio.html',
})
export class imagenSitioComponent {
  public urlImagen = "";
  public titulo = "";
  
  constructor(
    @Inject(MAT_DIALOG_DATA) data) {

    this.urlImagen = data.urlImagen;
    this.titulo = data.titulo;
    console.log("constructor" + this.urlImagen)
  }
}
