import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoProyectoComponent } from './tipo_proyecto.component';
import { ListTipoProyectoComponent } from './list-tipo_proyecto/list-tipo_proyecto.component';
import { CrudTipoProyectoComponent } from './crud-tipo_proyecto/crud-tipo_proyecto.component';



const routes: Routes = [{
  path: '',
  component: TipoProyectoComponent,
  children: [{
    path: 'list-tipo_proyecto',
    component: ListTipoProyectoComponent,
  }, {
    path: 'crud-tipo_proyecto',
    component: CrudTipoProyectoComponent,
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

export class TipoProyectoRoutingModule { }

export const routedComponents = [
  TipoProyectoComponent,
  ListTipoProyectoComponent,
  CrudTipoProyectoComponent,
];
