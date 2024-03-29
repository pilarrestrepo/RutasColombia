import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ListarSitiosComponent } from 'app/listar-sitios/listar-sitios.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CrearSitioComponent } from 'app/crear-sitio/crear-sitio.component';
import { AgmCoreModule} from '@agm/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ListarSitiosCategoriasComponent } from 'app/listar-sitios-categorias/listar-sitios-categorias.component';
import { CrearSitiosCategoriasComponent } from 'app/crear-sitios-categorias/crear-sitios-categorias.component';
import { ListarSitiosEmpresasComponent } from 'app/listar-sitios-empresas/listar-sitios-empresas.component';
import { CrearSitiosEmpresasComponent } from 'app/crear-sitios-empresas/crear-sitios-empresas.component';
import { imagenCategoriaComponent } from 'app/crear-sitios-categorias/imagen-categoria.component';
import { imagenSitioComponent } from 'app/crear-sitio/imagen-sitio.component';
// import { LoginComponent } from 'app/login/login.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,    
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpE16AXpVJ53SYngJSI6_SJ-VSBB_W4pc',
      libraries: ['places']
    })    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    // LoginComponent,
    ListarSitiosComponent,
    ListarSitiosCategoriasComponent,
    ListarSitiosEmpresasComponent,
    CrearSitioComponent,
    CrearSitiosCategoriasComponent,
    CrearSitiosEmpresasComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    imagenCategoriaComponent,
    imagenSitioComponent
  ]
})

export class AdminLayoutModule {}
