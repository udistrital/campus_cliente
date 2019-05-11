import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraduccionComponent } from './traduccion.component';
import { ListTraduccionComponent } from './list-traduccion/list-traduccion.component';
import { CrudTraduccionComponent } from './crud-traduccion/crud-traduccion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TraduccionComponent,
  children: [{
    path: 'list-traduccion',
    component: ListTraduccionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'ASPIRANTE',
      ],
    },
  }, {
    path: 'crud-traduccion',
    component: CrudTraduccionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'ASPIRANTE',
      ],
    },
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

export class TraduccionRoutingModule { }

export const routedComponents = [
  TraduccionComponent,
  ListTraduccionComponent,
  CrudTraduccionComponent,
];
