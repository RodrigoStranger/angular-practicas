import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AlumnosComponent } from './pages/dashboard/alumnos/alumnos.component';
import { DetalleComponent } from './pages/dashboard/detalle/detalle.component';

export const routes: Routes = [
    { path:'', component: LoginComponent},
    { path:'login', component: LoginComponent},
    { path:'alumnos', component: AlumnosComponent},
    { path:'detalle', component: DetalleComponent},
];
