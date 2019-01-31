import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraduccionComponent } from './traduccion.component';
import { ListTraduccionComponent } from './list-traduccion/list-traduccion.component';
import { CrudTraduccionComponent } from './crud-traduccion/crud-traduccion.component';



const routes: Routes = [{
  path: '',
  component: TraduccionComponent,
  children: [{
    path: 'list-traduccion',
    component: ListTraduccionComponent,
  }, {
    path: 'crud-traduccion',
    component: CrudTraduccionComponent,
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
