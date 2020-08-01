import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  lenguajeSeleccionado = 'es';

  constructor(private translateService: TranslateService) {
      this.translateService.setDefaultLang(this.lenguajeSeleccionado);
      this.translateService.use(this.lenguajeSeleccionado);
  }

  toogleLanguage(lang: string) {
      this.translateService.use(lang);
  }

  ngOnInit(): void {
  }

}
