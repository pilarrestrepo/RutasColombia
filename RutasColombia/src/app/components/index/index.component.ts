import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public lenguajeSeleccionado = 'es';

  constructor(private translateService: TranslateService) {
    console.log("IndexComponent")
    var ln = navigator.language;
    this.lenguajeSeleccionado = ln.substr(0,2);
    console.log(this.lenguajeSeleccionado)
    

    this.translateService.setDefaultLang(this.lenguajeSeleccionado);
    this.translateService.use(this.lenguajeSeleccionado);


  }

  toogleLanguage(lang: string) {
    this.translateService.use(lang);
    this.lenguajeSeleccionado = lang;
  }

  ngOnInit(): void {
  }

}
