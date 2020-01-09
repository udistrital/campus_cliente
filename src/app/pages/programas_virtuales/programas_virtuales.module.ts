import { ProgramasVirtualesRoutingModule, routedComponents } from './programas_virtuales-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { METComponent } from './met/met.component';
import { MTMComponent } from './mtm/mtm.component';
import { EETComponent } from './eet/eet.component';

@NgModule({
  imports: [
    ThemeModule,
    ProgramasVirtualesRoutingModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
  ],
  exports: [
    METComponent,
    MTMComponent,
    EETComponent,
  ],
})
export class ProgramasVirtualesModule { }
