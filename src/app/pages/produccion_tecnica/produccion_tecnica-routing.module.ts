import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduccionTecnicaComponent } from './produccion_tecnica.component';
import { ListProduccionTecnicaComponent } from './list-produccion_tecnica/list-produccion_tecnica.component';
import { CrudProduccionTecnicaComponent } from './crud-produccion_tecnica/crud-produccion_tecnica.component';



const routes: Routes = [{
  path: '',
  component: ProduccionTecnicaComponent,
  children: [{
    path: 'list-produccion_tecnica',
    component: ListProduccionTecnicaComponent,
  }, {
    path: 'crud-produccion_tecnica',
    component: CrudProduccionTecnicaComponent,
  }],
}];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [
      RouterModule,
  ],
})

export class ProduccionTecnicaRoutingModule { }

export const routedComponents = [
  ProduccionTecnicaComponent,
  ListProduccionTecnicaComponent,
  CrudProduccionTecnicaComponent,
];
