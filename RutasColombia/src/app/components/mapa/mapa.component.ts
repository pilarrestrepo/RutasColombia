import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SitiosService } from '../../services/sitios.service'

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  lat = 0;
  lng = 0;  
  public error="";  
  public cargando = false;
  public suscribirEventoCambiarIdioma: any
  public sitosCercanos=[];

  @Input() eventoCambiarIdioma: Observable<void>;  
  constructor(private translateService: TranslateService,
    private sitiosService : SitiosService) {
  }

  ngOnInit(): void {
    this.suscribirEventoCambiarIdioma = this.eventoCambiarIdioma.subscribe(() => this.establecerIdioma())
    this.obtenerPosicion();
  }
  // Obtener la geolocalización
  obtenerPosicion() {
    console.log("obtenerPosicion");

    // console.log('Botón geolocalización');
    /*$.mdtoast('Cargando mapa...', {
        interaction: true,
        interactionTimeout: 2000,
        actionText: 'Ok!'
    });*/

    
    
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos);
      //mostrarMapaModal( pos.coords.latitude, pos.coords.longitude );
      this.lat = +pos.coords.latitude;
      this.lng = +pos.coords.longitude;
      
    });
  }
  establecerIdioma(){
    let idioma = sessionStorage.getItem("Idioma");
    this.translateService.use(idioma);
  }
  obtenerSitioCercanos() {
    navigator.geolocation.getCurrentPosition(pos => {

      console.log(pos);
      //mostrarMapaModal( pos.coords.latitude, pos.coords.longitude );

      let lat = pos.coords.latitude;
      let lng = pos.coords.longitude;
      let punto ={
        latitud : +lat,
        longitud : +lng,
      }
      console.log(punto);
      this.consultarSitioCercanos(punto)
      

    });
  }
  consultarSitioCercanos(punto:any) {
    console.log ("consultarSitioCercanos")

    this.error = "";
    this.cargando = true;
    this.sitiosService.consultarSitioCercanos(punto)      
      .subscribe(
        data => {
          console.log(data)
          let sitosCercanos = JSON.parse(JSON.stringify(data));
          console.log (this.sitosCercanos )
          this.mostrarSitiosCercanos(punto, sitosCercanos);
          
          this.cargando = false;
        },
        error => {    
          this.cargando = false;      
          this.error = error;
        });
  }
  mostrarSitiosCercanos(punto: any, sitosCercanos:any){
    this.sitosCercanos=[];
    this.sitosCercanos.push({
      punto:{
        "latitud": +punto.latitud,
        "longitud": +punto.longitud,
    }})      
    for (let sito of sitosCercanos){
      this.sitosCercanos.push({
        punto:{
          "latitud": +sito.punto.latitud,
          "longitud": +sito.punto.longitud,
      }})      
    }
    console.log(this.sitosCercanos)
    
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
