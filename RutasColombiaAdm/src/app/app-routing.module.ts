import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListarSitiosComponent } from './components/listar-sitios/listar-sitios.component';
import { CrearSitioComponent } from './components/crear-sitio/crear-sitio.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },    
  {
    
    path: '', component: IndexComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'sitios', component: ListarSitiosComponent },
      { path: 'crearSitio/:id', component: CrearSitioComponent }

    ] 
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
