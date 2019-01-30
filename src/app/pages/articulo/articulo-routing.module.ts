import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticuloComponent } from './articulo.component';
import { ListArticuloComponent } from './list-articulo/list-articulo.component';
import { CrudArticuloComponent } from './crud-articulo/crud-articulo.component';


const routes: Routes = [{
  path: '',
  component: ArticuloComponent,
  children: [{
    path: 'list-articulo',
    component: ListArticuloComponent,
  }, {
    path: 'crud-articulo',
    component: CrudArticuloComponent,
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

export class ArticuloRoutingModule { }

export const routedComponents = [
  ArticuloComponent,
  ListArticuloComponent,
  CrudArticuloComponent,
];
