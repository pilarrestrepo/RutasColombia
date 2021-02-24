import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ListarSitiosComponent } from 'app/listar-sitios/listar-sitios.component';
import { CrearSitioComponent } from 'app/crear-sitio/crear-sitio.component';
import { ListarSitiosCategoriasComponent } from 'app/listar-sitios-categorias/listar-sitios-categorias.component';
import { CrearSitiosCategoriasComponent } from 'app/crear-sitios-categorias/crear-sitios-categorias.component';
import { ListarSitiosEmpresasComponent } from 'app/listar-sitios-empresas/listar-sitios-empresas.component';
import { CrearSitiosEmpresasComponent } from 'app/crear-sitios-empresas/crear-sitios-empresas.component';
import { LoginComponent } from 'app/login/login.component';

export const AdminLayoutRoutes: Routes = [    
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'listar-sitios',   component: ListarSitiosComponent },
    { path: 'listar-categorias',   component: ListarSitiosCategoriasComponent },    
    { path: 'listar-empresas',   component: ListarSitiosEmpresasComponent },
    { path: 'crear-sitio/:id', component: CrearSitioComponent },
    { path: 'crear-categoria/:id', component: CrearSitiosCategoriasComponent },    
    { path: 'crear-empresa/:id', component: CrearSitiosEmpresasComponent },  
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'login',        component: LoginComponent },
];
