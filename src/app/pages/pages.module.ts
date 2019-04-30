import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { SharedModule } from '../shared/shared.module';
import { ConfiguracionService } from '../@core/data/configuracion.service';
import { DetalleAdmisionComponent } from './detalle-admision/detalle-admision.component';
import { CampusMidService } from '../@core/data/campus_mid.service';
import { ExperienciaService } from '../@core/data/experiencia.service';
import { OrganizacionService } from '../@core/data/organizacion.service';
import { IdiomaService } from '../@core/data/idioma.service';
import { NuxeoService } from '../@core/utils/nuxeo.service';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    SharedModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    DetalleAdmisionComponent,
  ],
  providers: [
    ConfiguracionService,
    CampusMidService,
    ExperienciaService,
    OrganizacionService,
    IdiomaService,
    NuxeoService,
  ],
})
export class PagesModule {
}
