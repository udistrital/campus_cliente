import { TablaNotasRoutingModule, routedComponents } from './tabla_notas-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { IdiomaService } from '../../@core/data/idioma.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    ThemeModule,
    TablaNotasRoutingModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    IdiomaService,
  ],
  exports: [
  ],
})
export class TablaNotasModule { }
