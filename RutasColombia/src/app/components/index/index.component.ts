import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public idiomaSeleccionado;
  public eventoCambiarIdioma: Subject<void> = new Subject<void>();
  
  constructor(private translateService: TranslateService) {
    console.log("IndexComponent")
    this.establecerIdioma();
  }
  establecerIdioma(){
    let idioma = sessionStorage.getItem("Idioma");
    this.translateService.use(idioma);
  }
  cambiarIdioma(idioma: string) {
    sessionStorage.setItem("Idioma",idioma);
    this.translateService.use(idioma);        
    this.emitirCambiarIdioma();
  }

  emitirCambiarIdioma() {
    this.eventoCambiarIdioma.next();
  }

  ngOnInit(): void {
  }

}
