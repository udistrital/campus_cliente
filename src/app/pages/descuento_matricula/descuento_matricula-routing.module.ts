import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DescuentoMatriculaComponent } from './descuento_matricula.component';
import { ListDescuentoMatriculaComponent } from './list-descuento_matricula/list-descuento_matricula.component';
import { CrudDescuentoMatriculaComponent } from './crud-descuento_matricula/crud-descuento_matricula.component';
// import { ViewDescuentoMatriculaComponent } from './view-descuento_matricula/view-descuento_matricula.component';
// import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: DescuentoMatriculaComponent,
  children: [{
    path: 'list-descuento_matricula',
    component: ListDescuentoMatriculaComponent,
    // canActivate: [AuthGuard],
  }, {
    path: 'crud-descuento_matricula',
    component: CrudDescuentoMatriculaComponent,
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

export class DescuentoMatriculaRoutingModule { }

export const routedComponents = [
  DescuentoMatriculaComponent,
  ListDescuentoMatriculaComponent,
  CrudDescuentoMatriculaComponent,
];
