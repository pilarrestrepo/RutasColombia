import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    console.log("AppComponent")
    this.establecerIdiomaPorDefecto();
  }
  establecerIdiomaPorDefecto(){
    console.log("establecerIdiomaPorDefecto")
    var ln = navigator.language;
    let idioma = ln.substr(0,2);
    sessionStorage.setItem("Idioma",idioma);
  }
}
