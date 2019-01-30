import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtraPublicacionComponent } from './otra_publicacion.component';
import { ListOtraPublicacionComponent } from './list-otra_publicacion/list-otra_publicacion.component';
import { CrudOtraPublicacionComponent } from './crud-otra_publicacion/crud-otra_publicacion.component';



const routes: Routes = [{
  path: '',
  component: OtraPublicacionComponent,
  children: [{
    path: 'list-otra_publicacion',
    component: ListOtraPublicacionComponent,
  }, {
    path: 'crud-otra_publicacion',
    component: CrudOtraPublicacionComponent,
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

export class OtraPublicacionRoutingModule { }

export const routedComponents = [
  OtraPublicacionComponent,
  ListOtraPublicacionComponent,
  CrudOtraPublicacionComponent,
];
