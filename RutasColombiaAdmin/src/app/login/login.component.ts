import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private usuariosService: UsuariosService) { }
  
  public model = {    
    "usuario": null,
    "clave": null
  }
  usuario=null;
  ngOnInit() {

  }

  login(): void {        
    console.log("login")
    this.router.navigate(["dashboard"]);
   // this.autenticarUsuario();
  }
  autenticarUsuario() {        
    console.log("autenticarUsuario", this.model)
    this.usuariosService.autenticarUsuario(this.model)
      .subscribe(res => {
        this.usuario = JSON.parse(JSON.stringify(res));
        if (!this.usuario){
          alert("Error en la autenticación");
        }else{
          sessionStorage.SetItem('usuarioActual',this.usuario)          
          this.router.navigate(["dashboard"]);
        }
             
      }, err => {
        alert("Error en la autenticación");
      })
  }
}
