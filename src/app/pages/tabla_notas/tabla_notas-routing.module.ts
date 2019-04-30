import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablaNotasComponent } from './tabla_notas.component';
import { ListTablaNotasComponent } from './list-tabla_notas/list-tabla_notas.component';



const routes: Routes = [{
  path: '',
  component: TablaNotasComponent,
  children: [{
    path: 'list-tabla_notas',
    component: ListTablaNotasComponent,
  }, {
    path: 'crud-tabla_notas',
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

export class TablaNotasRoutingModule { }

export const routedComponents = [
  TablaNotasComponent,
  ListTablaNotasComponent,
];
