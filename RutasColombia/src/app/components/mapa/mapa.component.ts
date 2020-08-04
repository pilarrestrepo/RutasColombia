import { Component, OnInit, Input, SimpleChange,ViewChild  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SitiosService } from '../../services/sitios.service'
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'

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

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 8,
  }
  markers = []
  infoContent = ''

  @Input() eventoCambiarIdioma: Observable<void>;  
  constructor(private translateService: TranslateService,
    private sitiosService : SitiosService) {
  }

  ngOnInit(): void {
    this.suscribirEventoCambiarIdioma = this.eventoCambiarIdioma.subscribe(() => this.establecerIdioma())
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    this.obtenerPosicion();
  }
  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }
  click(event: google.maps.MouseEvent) {
    console.log(event)
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    })
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
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
