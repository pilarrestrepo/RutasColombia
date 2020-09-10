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
  private geoCoder;

  public lat = 0;
  public lng = 0;
  public error = "";
  public cargando = false;
  public suscribirEventoCambiarIdioma: any
  public sitosCercanos = [];
  public infoWindow = null
  public idioma = "es";
  public direccionBusquedaOrigen: string;
  public direccionBusquedaDestino: string;
  public distancia = 72;
  public direccionActual = "";
  public zoom = 11;

  private iconBase = '../../../assets/icons/mapa/'
  private urlImagenBase = '../../../assets/images/sitios/'
  private iconEstaAqui = 'you-are-here-2.png'
  public origin: any;
  public destination: any;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow
  @ViewChild('busquedaOrigen') public busquedaOrigenElementRef: ElementRef;
  @ViewChild('busquedaDestino') public busquedaDestinoElementRef: ElementRef;


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

      let autocompleteOrigen = new google.maps.places.Autocomplete(this.busquedaOrigenElementRef.nativeElement);
      let autocompleteDestino = new google.maps.places.Autocomplete(this.busquedaDestinoElementRef.nativeElement);
      autocompleteOrigen.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocompleteOrigen.getPlace();
          console.log(place)
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom          
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.origin = { lat: this.lat, lng: this.lng };
          this.zoom = 12;
        });
      });
      autocompleteDestino.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocompleteDestino.getPlace();
          console.log(place)
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom          
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.destination = { lat: this.lat, lng: this.lng };
          this.zoom = 12;
        });
      });
    });
    this.getDirection();
  }
  getDirection() {
    this.origin = { lat: this.lat, lng: this.lng };
    this.destination = { lat: 24.799524, lng: 120.975017 };
  }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 8;
        this.origin = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.getAddress(this.lat, this.lng);
      });
    }
  }


  markerDragEnd($event: any) {
    console.log($event);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.getAddress(this.lat, this.lng);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.direccionBusquedaOrigen = results[0].formatted_address;
          this.direccionActual = results[0].formatted_address;
          
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  /* getAddress(latitude, longitude) {
    var promesa = new Promise(function (resolve, reject) {
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            resolve(results[0].formatted_address);
            this.direccionBusquedaOrigen = results[0].formatted_address;
          } else {
            reject('No results found');
          }
        } else {
          reject('Geocoder failed due to: ' + status);
        }
      });
    });
    return promesa;
  } */
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
  getcoords(type, event) {
    console.log("getcoords")
    console.log(type)
    console.log(event)
    let coords = JSON.stringify(event);
    let coords3 = JSON.parse(coords);
    console.log(coords3);
    console.log("updated longitude :: " + coords3.lng);
  }
  onChange(event) {
    console.log("onChange")
    console.log(event)
    var route = event.routes[0];
    var points = new Array();
    var legs = route.legs;
    for (let i = 0; i < legs.length; i++) {
      var steps = legs[i].steps;
      for (let j = 0; j < steps.length; j++) {
        var nextSegment = steps[j].path;
        for (let k = 0; k < nextSegment.length; k++) {
          points.push(nextSegment[k]);
        }
      }
    }
    console.log(points)
  }
  onResponse(event) {
    console.log("onResponse")

    console.log(event)
  }
  clickedMarker(infoWindow, gm, index: number) {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
    this.infoWindow = infoWindow;
    this.sitosCercanos.forEach((value, i) => {
      if (i == index) {
        this.sitosCercanos[i].punto.animation = 'BOUNCE'
      } else {
        this.sitosCercanos[i].punto.animation = null
      }
    });
  }

  mapClicked($event: any) {
    console.log("mapClicked")
    console.log($event)
    if (this.infoWindow) {
      this.infoWindow.close();
    }
  }

  // Obtener la geolocalización
  obtenerPosicion() {
    console.log("obtenerPosicion");
    navigator.geolocation.getCurrentPosition(pos => {
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
      let lat = pos.coords.latitude;
      let lng = pos.coords.longitude;
      let punto = {
        latitud: +lat,
        longitud: +lng,
        distancia: +72000
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
  }
  editarMarcador(marcador: any) {
    marcador.punto.animation = 'BOUNCE'
  }
  ngOnDestroy() {
    this.suscribirEventoCambiarIdioma.unsubscribe()
  }

}

