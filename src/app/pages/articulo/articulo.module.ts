import { ArticuloRoutingModule, routedComponents } from './articulo-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProduccionAcademicaService } from '../../@core/data/produccion_academica.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudArticuloComponent } from './crud-articulo/crud-articulo.component';
import { ListArticuloComponent} from './list-articulo/list-articulo.component';
import { UserService } from '../../@core/data/users.service';
@NgModule({
  imports: [
    ThemeModule,
    ArticuloRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ProduccionAcademicaService,
    UserService,
  ],
  exports: [
    CrudArticuloComponent,
    ListArticuloComponent,
  ],
})
export class ArticuloModule { }
