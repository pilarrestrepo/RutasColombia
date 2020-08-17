import { Component, OnInit, Input, SimpleChange, ViewChild, ElementRef, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SitiosService } from '../../services/sitios.service'
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  lat = 0;
  lng = 0;
  public error = "";
  public cargando = false;
  public suscribirEventoCambiarIdioma: any
  public sitosCercanos = [];
  public infoWindow = null
  public idioma = "es";
  direccionBusqueda: string;
  private geoCoder;
  distancia=72;
  direccionActual="";
  
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow
  @ViewChild('search') public searchElementRef: ElementRef;

  zoom = 11
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
  iconBase = '../../../assets/icons/mapa/'
  urlImagenBase = '../../../assets/images/sitios/'
  iconEstaAqui = 'you-are-here-2.png'
  latitude: number;
  longitude: number;
  @Input() eventoCambiarIdioma: Observable<void>;
  constructor(private translateService: TranslateService,
    private sitiosService: SitiosService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.suscribirEventoCambiarIdioma = this.eventoCambiarIdioma.subscribe(() => this.establecerIdioma())
   //load Places Autocomplete
   this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
    this.geoCoder = new google.maps.Geocoder;

    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        console.log("entre")
        
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        console.log(place)
        //verify result
        if (place.geometry === undefined || place.geometry === null) {          
          return;
        }
        console.log("enteee" + place.geometry.location.lat())
        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.lat = this.latitude;
        this.lng = this.longitude;        
        this.zoom = 12;
      });
    });
  });
   /*  navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    })

    this.obtenerPosicion(); */
    
  }
// Get Current Location Coordinates
private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 8;
      this.getAddress(this.latitude, this.longitude);
    });
  }
}


markerDragEnd($event: any) {
  console.log($event);
  this.latitude = $event.coords.lat;
  this.longitude = $event.coords.lng;
  this.getAddress(this.latitude, this.longitude);
}

getAddress(latitude, longitude) {
  this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
    console.log(results);
    console.log(status);
    if (status === 'OK') {
      if (results[0]) {
        this.zoom = 12;
        this.direccionBusqueda = results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });
}
  obtenerValorPropiedad(objeto, propiedad): string {
    let valor = Object.keys(objeto).map(key => objeto[propiedad]);
    return valor[0];
  }
  cerrar() {
    console.log("cerrar")
    this.sitosCercanos.forEach((value, i) => {
      this.sitosCercanos[i].punto.animation = null

    });
  }

  clickedMarker(infoWindow, gm, index: number) {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
    this.infoWindow = infoWindow;



    /*     if (this.previous_info_window == null)
          this.previous_info_window = infoWindow;
        else {
          this.infoWindowOpened = infoWindow
          this.previous_info_window.close()
        }
        this.previous_info_window = infoWindow */
    //infoWindow.open();

    this.sitosCercanos.forEach((value, i) => {
      if (i == index) {
        this.sitosCercanos[i].punto.animation = 'BOUNCE'
      } else {
        this.sitosCercanos[i].punto.animation = null
      }
    });
  }

  mapClicked($event: any) {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }



  /*
    markerDragEnd(m: any, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
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
      icon: {
        url: "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png",
        size: new google.maps.Size(7, 7),
        anchor: new google.maps.Point(4, 4)
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
  */
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
  establecerIdioma() {
    this.idioma = sessionStorage.getItem("Idioma");
    this.translateService.use(this.idioma);
  }
  obtenerSitioCercanos() {
    navigator.geolocation.getCurrentPosition(pos => {

      console.log(pos);
      //mostrarMapaModal( pos.coords.latitude, pos.coords.longitude );

      let lat = pos.coords.latitude;
      let lng = pos.coords.longitude;
      let punto = {
        latitud: +lat,
        longitud: +lng,
        distancia:+72000
      }
      console.log(punto);
      this.consultarSitioCercanos(punto)


    });
  }
  consultarSitioCercanos(punto: any) {
    console.log("consultarSitioCercanos")

    this.error = "";
    this.cargando = true;
    this.sitiosService.consultarSitioCercanos(punto)
      .subscribe(
        data => {
          console.log(data)
          let sitosCercanos = JSON.parse(JSON.stringify(data));
          console.log(this.sitosCercanos)
          this.mostrarSitiosCercanos(punto, sitosCercanos);

          this.cargando = false;
        },
        error => {
          this.cargando = false;
          this.error = error;
        });
  }
  borrarSitiosCercanos() {
    this.sitosCercanos = [];
  }
  mostrarSitiosCercanos(punto: any, sitosCercanos: any) {
    this.sitosCercanos = [];
    let idiomas = {
      es: {
        nombre: "Estas aquí",
        descripcion: "Estas aquí"
      },
      en: {
        nombre: "Are you here",
        descripcion: "Are you here"
      }
    }
    let idiomasCategoria = {
      idiomas: {
        es: {
          nombre: "Estas aquí"
        },
        en: {
          nombre: "Are you here"
        }
      }
    }
    this.sitosCercanos.push({
      punto: {
        "tipo": 1,
        "latitud": +punto.latitud,
        "longitud": +punto.longitud,
        "animation": 'BOUNCE',
        "icono": this.iconBase + this.iconEstaAqui,
        "nombre": "Estas aquí",
        "idiomas": idiomas,
        "descripcion": "",
        "categoria": idiomasCategoria,
        "imagen": "",
        "direccion": "",
        "telefono": "",
        "url": "",
        "distiacia": "1.5",
        "draggable": true

      }
    })
    for (let sito of sitosCercanos) {
      this.sitosCercanos.push({
        punto: {
          "tipo": 2,
          "latitud": +sito.punto.latitud,
          "longitud": +sito.punto.longitud,
          "animation": 'DROP',
          "icono": this.iconBase + sito.icono,
          "nombre": sito.nombre,
          "idiomas": sito.idiomas,
          "categoria": sito.categoria,
          "imagen": this.urlImagenBase + sito.urlImagen,
          "direccion": sito.direccion,
          "telefono": sito.telefono,
          "url": sito.url,
          "distancia": "3.5",
          "draggable": true

        }
      })
    }
    console.log(this.sitosCercanos)
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png';
    const image = {
      url:
        iconBase,
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };

    this.markers.push({
      position: {
        lat: punto.latitud,
        lng: punto.longitud
      },
      icon: image,
      title: 'Estoy aquí... ',
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    })


  }
  editarMarcador(marcador: any) {
    marcador.punto.animation = 'BOUNCE'


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

