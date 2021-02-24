import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { MapsComponent } from '../../maps/maps.component';

export const AdminLayoutRoutes: Routes = [        
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'maps',           component: MapsComponent }
];
