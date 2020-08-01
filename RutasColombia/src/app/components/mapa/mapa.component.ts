import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  @Input() lenguajeSeleccionado: string;
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(this.lenguajeSeleccionado);
    this.translateService.use(this.lenguajeSeleccionado);
  }

  ngOnInit(): void {
  }
  // Obtener la geolocalización
  obtenerPosicion() {

    // console.log('Botón geolocalización');
    /*$.mdtoast('Cargando mapa...', {
        interaction: true,
        interactionTimeout: 2000,
        actionText: 'Ok!'
    });*/


    navigator.geolocation.getCurrentPosition(pos => {

      console.log(pos);
      //mostrarMapaModal( pos.coords.latitude, pos.coords.longitude );

      let lat = pos.coords.latitude;
      let lng = pos.coords.longitude;
      console.log(lat)
      console.log(lng)

    });
  }
}
