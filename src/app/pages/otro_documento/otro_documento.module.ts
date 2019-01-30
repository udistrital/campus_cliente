import { OtroDocumentoRoutingModule, routedComponents } from './otro_documento-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProduccionAcademicaService } from '../../@core/data/produccion_academica.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudOtroDocumentoComponent } from './crud-otro_documento/crud-otro_documento.component';
import { ListOtroDocumentoComponent } from './list-otro_documento/list-otro_documento.component';

@NgModule({
  imports: [
    ThemeModule,
    OtroDocumentoRoutingModule,
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
    CrudOtroDocumentoComponent,
    ListOtroDocumentoComponent,
  ],
})
export class OtroDocumentoModule { }
