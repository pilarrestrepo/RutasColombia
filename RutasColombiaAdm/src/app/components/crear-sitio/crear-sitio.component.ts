import { Component, OnInit,ViewChild, NgZone, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { HttpClient} from '@angular/common/http';
import { DepartamentosService } from '../../services/departamentos.service'
@Component({
  selector: 'app-crear-sitio',
  templateUrl: './crear-sitio.component.html',
  styleUrls: ['./crear-sitio.component.css']
})
export class CrearSitioComponent implements OnInit {
  public error = "";
  public cargando = false;
  public departamentos = [];  
  public municipios = [];
  public departamentoSeleccionado;  
  private navigationSubscription;
  private navigationSubscriptionParams;
  public idSitio: any;  
  public buscarSitio = null;
  public imagen = null;
  public lat = 0;
  public lng = 0;
  public zoom = 12;  
  public model = {
    "nombre": null,
    "direccion": null,
    "telefono": null,
    "categoria": null,
    "municipio": null,
    "punto": {
      "latitud": null,
      "longitud": null
    },
    "icono": null,
    "urlImagen": null,
    "url": null,
    "idiomas": {
      "es":
      {
        "nombre": null,
        "descripcion": null
      },
      "en":
      {
        "nombre": null,
        "descripcion": null
      }

    },
    "coordenadas": null
  }
  @ViewChild('busquedaSitio') public busquedaSitioElementRef: ElementRef;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private ngZone: NgZone,
              private mapsAPILoader: MapsAPILoader,
              private http: HttpClient,
              private departamentosService: DepartamentosService) { 

    this.lat = 51.678418;
    this.lng = 7.809007;
    this.listarDepartamentos();
  }

  ngOnInit(): void {
    console.log("ngOnInit")
    console.log(this.busquedaSitioElementRef)
  
  }
  initialiseInvites() {
    this.navigationSubscriptionParams = this.route.params.subscribe(params => {
      this.idSitio = params.id;
    });
  }
  ngAfterViewInit() {
    let autocompleteSitio = new google.maps.places.Autocomplete(this.busquedaSitioElementRef.nativeElement);
    autocompleteSitio.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocompleteSitio.getPlace();
        console.log(place)
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        //set latitude, longitude and zoom          
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();        
        this.zoom = 12;
        this.model.punto.latitud = this.lat;
        this.model.punto.longitud = this.lng;
      });
    });  
  }

  mapClicked(map: any) {
    map.addListener('click', (e) => {
      console.log("clickMapa")
      console.log(e)
      this.lat = e.coords.lat;
      this.lng = e.coords.lng;      
    });    

  }   
  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput:any){
    console.log("fileChangeEvent", fileInput)
    console.log("fileInput.target.files", fileInput.target.files)
    
    this.filesToUpload=<Array<File>> fileInput.target.files;

    var blob;
    const file = fileInput.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      blob = new Blob([reader.result]);
      console.log('archivo: ',blob);
    };
    
    reader.readAsDataURL(blob);
  }

  listarDepartamentos() {
    console.log("listarDepartamentos")
    this.error = "";
    this.cargando = true;
    this.departamentosService.listarDepartamentos()
      .subscribe(
        data => {
          console.log(data)
          this.departamentos = JSON.parse(JSON.stringify(data));
          console.log(this.departamentos)
          this.cargando = false;
        },
        error => {
          this.cargando = false;
          this.error = error;
        });
  }
  public seleccionDepartamento(e) {
    console.log("seleccionDepartamento", e)
  } 
  
}
