import { AdmisionRoutingModule, routedComponents } from './admision-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { ImplicitAutenticationService } from './../../@core/utils/implicit_autentication.service';
import { InscripcionModule } from '../inscripcion/inscripcion.module';
import { PosgradoComponent } from '../inscripcion/posgrado/posgrado.component';
import { InscripcionService } from '../../@core/data/inscripcion.service';

@NgModule({
  imports: [
    ThemeModule,
    AdmisionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
    InscripcionModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    InscripcionService,
    ImplicitAutenticationService,
  ],
  entryComponents: [
    PosgradoComponent,
  ],
})
export class AdmisionModule { }
