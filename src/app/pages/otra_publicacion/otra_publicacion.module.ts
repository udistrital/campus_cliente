import { OtraPublicacionRoutingModule, routedComponents } from './otra_publicacion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProduccionAcademicaService } from '../../@core/data/produccion_academica.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudOtraPublicacionComponent } from './crud-otra_publicacion/crud-otra_publicacion.component';
import { ListOtraPublicacionComponent } from './list-otra_publicacion/list-otra_publicacion.component';

@NgModule({
  imports: [
    ThemeModule,
    OtraPublicacionRoutingModule,
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
    CrudOtraPublicacionComponent,
    ListOtraPublicacionComponent,
  ],
})
export class OtraPublicacionModule { }
