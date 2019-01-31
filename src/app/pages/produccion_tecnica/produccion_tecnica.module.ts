import { ProduccionTecnicaRoutingModule, routedComponents } from './produccion_tecnica-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProduccionAcademicaService } from '../../@core/data/produccion_academica.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudProduccionTecnicaComponent } from './crud-produccion_tecnica/crud-produccion_tecnica.component';
import { ListProduccionTecnicaComponent } from './list-produccion_tecnica/list-produccion_tecnica.component';

@NgModule({
  imports: [
    ThemeModule,
    ProduccionTecnicaRoutingModule,
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
    CrudProduccionTecnicaComponent,
    ListProduccionTecnicaComponent,
  ],
})
export class ProduccionTecnicaModule { }
