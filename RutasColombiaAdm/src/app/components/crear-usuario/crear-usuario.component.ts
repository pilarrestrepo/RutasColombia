import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {


  private navigationSubscription;
  private navigationSubscriptionParams;
  idUsuario=0;
  public model = {
    "id": null,
    "usuario": null,
    "clave": null,
    "fechaRegistro": null,

    "persona": {
      "tipoDocumento": null,
      "numeroDocumento": null,
      "nombre": null,
      "apellido": null,
      "fechaNacimiento": null,
      "genero": null,
      "correoElectronico": null,
      "telefonoCelular": null,
      "telefonoFijo": null
    }

  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader) {

  }

  ngOnInit(): void {


  }
  initialiseInvites() {
    this.navigationSubscriptionParams = this.route.params.subscribe(params => {
      this.idUsuario = params.id;
    });
  }


}
