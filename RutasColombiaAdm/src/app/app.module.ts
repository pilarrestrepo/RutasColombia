import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { IndexComponent } from './components/index/index.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {  TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { ListarSitiosComponent } from './components/listar-sitios/listar-sitios.component'
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { CrearSitioComponent } from './components/crear-sitio/crear-sitio.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { GenerarEstadisticasComponent } from './components/generar-estadisticas/generar-estadisticas.component'



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,    
    InicioComponent,
    ListarSitiosComponent,
    LoginComponent,
    CrearSitioComponent,
    ListarUsuariosComponent,
    CrearUsuarioComponent,
    DashBoardComponent,
    GenerarEstadisticasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
     apiKey: 'AIzaSyDBNR37FRIeI7ixrWSOFK9QF_SkM9WVTMc'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}