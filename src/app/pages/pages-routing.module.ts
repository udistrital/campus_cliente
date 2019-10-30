import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'inscripcion',
      loadChildren: './inscripcion/inscripcion.module#InscripcionModule',
    },
    {
      path: 'procesos_admisiones',
      loadChildren: './procesos_admisiones/admision.module#AdmisionModule',
    },
    {
      path: 'notificacion',
      loadChildren: './notificacion/notificacion.module#NotificacionModule',
    },
    {
      path: 'pago_linea',
      loadChildren: './pago_linea/pago_linea.module#PagoLineaModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
