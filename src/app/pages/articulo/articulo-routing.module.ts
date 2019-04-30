import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticuloComponent } from './articulo.component';
import { ListArticuloComponent } from './list-articulo/list-articulo.component';
import { CrudArticuloComponent } from './crud-articulo/crud-articulo.component';
// import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: ArticuloComponent,
  children: [{
    path: 'list-articulo',
    component: ListArticuloComponent,
    // canActivate: [AuthGuard],
  }, {
    path: 'crud-articulo',
    component: CrudArticuloComponent,
    // canActivate: [AuthGuard],
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
