import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-crear-sitio',
  templateUrl: './crear-sitio.component.html',
  styleUrls: ['./crear-sitio.component.css']
})
export class CrearSitioComponent implements OnInit {

  private navigationSubscription;
  private navigationSubscriptionParams;
  public idSitio: any;

  public model = {
    "nombre": null,
    "direccion": null,
    "telefono": null,
    "categoria": null,
    "municipio": null,
    "punto": {
      "latitud": null,
      "longitud": ""
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

  constructor(private router: Router,
              private route: ActivatedRoute) { 
    this.navigationSubscription = this.router.events.subscribe((e: any) => {      
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });    
  }

  ngOnInit(): void {
  }
  initialiseInvites() {
    this.navigationSubscriptionParams = this.route.params.subscribe(params => {
      this.idSitio = params.id;
    });
  }
}
