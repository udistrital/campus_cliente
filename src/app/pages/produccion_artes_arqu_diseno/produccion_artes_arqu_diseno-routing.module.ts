import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduccionArtesArquDisenoComponent } from './produccion_artes_arqu_diseno.component';
import { ListProduccionArtesArquDisenoComponent } from './list-produccion_artes_arqu_diseno/list-produccion_artes_arqu_diseno.component';
import { CrudProduccionArtesArquDisenoComponent } from './crud-produccion_artes_arqu_diseno/crud-produccion_artes_arqu_diseno.component';



const routes: Routes = [{
  path: '',
  component: ProduccionArtesArquDisenoComponent,
  children: [{
    path: 'list-produccion_artes_arqu_diseno',
    component: ListProduccionArtesArquDisenoComponent,
  }, {
    path: 'crud-produccion_artes_arqu_diseno',
    component: CrudProduccionArtesArquDisenoComponent,
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

export class ProduccionArtesArquDisenoRoutingModule { }

export const routedComponents = [
  ProduccionArtesArquDisenoComponent,
  ListProduccionArtesArquDisenoComponent,
  CrudProduccionArtesArquDisenoComponent,
];
