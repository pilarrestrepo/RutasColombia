import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  public error = "";
  public cargando = false;
  public sitos = [];
  constructor() { }

  ngOnInit(): void {
    this. listarUsuarios();
  }
  listarUsuarios() {
    console.log("listarSitios")
    this.error = "";
    this.cargando = true;
    this.sitiosService.listarSitios()
      .subscribe(
        data => {
          console.log(data)
          this.sitos = JSON.parse(JSON.stringify(data));
          console.log(this.sitos)
          this.cargando = false;
        },
        error => {
          this.cargando = false;
          this.error = error;
        });
  }
}
