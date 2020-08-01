import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  
  public suscribirEventoCambiarIdioma: any

  @Input() eventoCambiarIdioma: Observable<void>;  
  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.suscribirEventoCambiarIdioma = this.eventoCambiarIdioma.subscribe(() => this.establecerIdioma())
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
  establecerIdioma(){
    let idioma = sessionStorage.getItem("Idioma");
    this.translateService.use(idioma);
  }

  /*
  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    // Extract changes to the input property by its name
    let cambio: SimpleChange = changes['lenguajeSeleccionado'];
    console.log("ngOnChanges")
    console.log(cambio.currentValue)


    this.cambiarIdioma(cambio.currentValue);

  }*/
  ngOnDestroy() {
    this.suscribirEventoCambiarIdioma.unsubscribe()
  }
 
}
