import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprobanteComponent } from './comprobante.component';
import { DescargaComponent } from './descarga/descarga.component';

const routes: Routes = [{
  path: '',
  component: DescargaComponent,
  children: [{
    path: 'descarga',
    component: DescargaComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprobanteRoutingModule { }

export const routedComponents = [
  ComprobanteComponent,
  DescargaComponent,
];
