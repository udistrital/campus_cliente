import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropuestaGradoComponent } from './propuesta_grado.component';
import { ListPropuestaGradoComponent } from './list-propuesta_grado/list-propuesta_grado.component';
import { CrudPropuestaGradoComponent } from './crud-propuesta_grado/crud-propuesta_grado.component';



const routes: Routes = [{
  path: '',
  component: PropuestaGradoComponent,
  children: [{
    path: 'list-propuesta_grado',
    component: ListPropuestaGradoComponent,
  }, {
    path: 'crud-propuesta_grado',
    component: CrudPropuestaGradoComponent,
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

export class PropuestaGradoRoutingModule { }

export const routedComponents = [
  PropuestaGradoComponent,
  ListPropuestaGradoComponent,
  CrudPropuestaGradoComponent,
];
