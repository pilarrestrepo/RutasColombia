import { Component, OnInit } from '@angular/core';
import { SitiosService } from '../../services/sitios.service'

@Component({
  selector: 'app-listar-sitios',
  templateUrl: './listar-sitios.component.html',
  styleUrls: ['./listar-sitios.component.css']
})
export class ListarSitiosComponent implements OnInit {
  public error = "";
  public cargando = false;
  public sitos = [];
  constructor( private sitiosService: SitiosService) { }

  ngOnInit(): void {
    this.listarSitios();
  }
  listarSitios() {    
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
