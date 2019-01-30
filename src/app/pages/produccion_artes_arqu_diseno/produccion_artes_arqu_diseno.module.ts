import { ProduccionArtesArquDisenoRoutingModule, routedComponents } from './produccion_artes_arqu_diseno-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProduccionAcademicaService } from '../../@core/data/produccion_academica.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudProduccionArtesArquDisenoComponent } from './crud-produccion_artes_arqu_diseno/crud-produccion_artes_arqu_diseno.component';
import { ListProduccionArtesArquDisenoComponent } from './list-produccion_artes_arqu_diseno/list-produccion_artes_arqu_diseno.component';

@NgModule({
  imports: [
    ThemeModule,
    ProduccionArtesArquDisenoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ProduccionAcademicaService,
  ],
  exports: [
    CrudProduccionArtesArquDisenoComponent,
    ListProduccionArtesArquDisenoComponent,
  ],
})
export class ProduccionArtesArquDisenoModule { }
