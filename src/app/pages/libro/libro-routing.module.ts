import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibroComponent } from './libro.component';
import { ListLibroComponent } from './list-libro/list-libro.component';
import { CrudLibroComponent } from './crud-libro/crud-libro.component';
// import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: LibroComponent,
  children: [{
    path: 'list-libro',
    component: ListLibroComponent,
    // canActivate: [AuthGuard],
  }, {
    path: 'crud-libro',
    component: CrudLibroComponent,
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

export class LibroRoutingModule { }

export const routedComponents = [
  LibroComponent,
  ListLibroComponent,
  CrudLibroComponent,
];
