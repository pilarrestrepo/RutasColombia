import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service'

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  public error = "";
  public cargando = false;
  public sitos = [];
  constructor( private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.listarAdministradores();
  }
  listarAdministradores() {
    console.log("listarAdministradores")
    this.error = "";
    this.cargando = true;
    this.usuariosService.listarAdministradores()
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
