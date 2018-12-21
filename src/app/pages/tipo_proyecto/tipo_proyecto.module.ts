import { TipoProyectoRoutingModule, routedComponents } from './tipo_proyecto-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AdmisionesService } from '../../@core/data/admisiones.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoProyectoComponent } from './crud-tipo_proyecto/crud-tipo_proyecto.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoProyectoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    AdmisionesService,
  ],
  exports: [
    CrudTipoProyectoComponent,
  ],
})
export class TipoProyectoModule { }
