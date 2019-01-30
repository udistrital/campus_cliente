import { TraduccionRoutingModule, routedComponents } from './traduccion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProduccionAcademicaService } from '../../@core/data/produccion_academica.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTraduccionComponent } from './crud-traduccion/crud-traduccion.component';
import { ListTraduccionComponent} from './list-traduccion/list-traduccion.component';
@NgModule({
  imports: [
    ThemeModule,
    TraduccionRoutingModule,
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
    CrudTraduccionComponent,
    ListTraduccionComponent,
  ],
})
export class TraduccionModule { }
