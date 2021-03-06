import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { SitiosRutaComponent } from './components/sitios-ruta/sitios-ruta.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [

  {
    path: '', component: IndexComponent,
    children: [
      { path: '', component: MapaComponent },
      { path: 'mapa', component: MapaComponent },
      { path: 'sitiosRuta', component: SitiosRutaComponent },
      { path: 'registro', component: RegistroComponent }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
