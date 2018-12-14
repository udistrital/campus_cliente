import { PropuestaGradoRoutingModule, routedComponents } from './propuesta_grado-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
//import { PropuestaService } from '../../@core/data/propuesta.service';
import { AdmisionesService } from '../../@core/data/admisiones.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudPropuestaGradoComponent } from './crud-propuesta_grado/crud-propuesta_grado.component';

@NgModule({
  imports: [
    ThemeModule,
    PropuestaGradoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    //PropuestaService,
    AdmisionesService,
  ],
  exports: [
    CrudPropuestaGradoComponent,
  ],
})
export class PropuestaGradoModule { }
