import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generar-estadisticas',
  templateUrl: './generar-estadisticas.component.html',
  styleUrls: ['./generar-estadisticas.component.css']
})
export class GenerarEstadisticasComponent implements OnInit {
  public model = {
    "id": null,

    "fechaInicio": null,
    "fechaFin": null,

   

  }
  constructor() { }

  ngOnInit(): void {
  }

}
