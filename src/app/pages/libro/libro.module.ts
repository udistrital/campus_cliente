import { LibroRoutingModule, routedComponents } from './libro-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProduccionAcademicaService } from '../../@core/data/produccion_academica.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudLibroComponent } from './crud-libro/crud-libro.component';
import { ListLibroComponent } from './list-libro/list-libro.component';
import { UserService } from '../../@core/data/users.service';

@NgModule({
  imports: [
    ThemeModule,
    LibroRoutingModule,
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
    CrudLibroComponent,
    ListLibroComponent,
  ],
})
export class LibroModule { }
