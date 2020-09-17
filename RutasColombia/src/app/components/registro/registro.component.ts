import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  idUsuario=0;
  public model = {
    "id": null,
    "usuario": null,
    "clave": null,
    "fechaRegistro": null,

    "persona": {
      "tipoDocumento": null,
      "numeroDocumento": null,
      "nombre": null,
      "apellido": null,
      "fechaNacimiento": null,
      "genero": null,
      "correoElectronico": null,
      "telefonoCelular": null,
      "telefonoFijo": null
    }

  }
}
