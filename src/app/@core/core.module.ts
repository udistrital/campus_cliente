import { AuthInterceptor } from './_Interceptor/auth.Interceptor';
import { EnteService } from './data/ente.service';
import { UbicacionService } from './data/ubicacion.service';
import { CoreService } from './data/core.service';
import { PersonaService } from './data/persona.service';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { DocumentoService } from './data/documento.service'
// import { NotificacionesService } from './utils/notificaciones.service';
import { WebsocketService } from './utils/websocket.service';
import { AuthGuard } from './_guards/auth.guard';
import { ListService } from './store/services/list.service';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store/rootReducer';
import { InscripcionService } from './data/inscripcion.service';
import { IdiomaService } from './data/idioma.service';
import { ProgramaAcademicoService } from './data/programa_academico.service';
import { ProduccionAcademicaService } from './data/produccion_academica.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({

    strategies: [
      NbDummyAuthStrategy.setup({
        name: 'email',
        delay: 3000,
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(rootReducer),
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
  providers: [
    AuthGuard,
    ListService,
    PersonaService,
    InscripcionService,
    IdiomaService,
    UbicacionService,
    CoreService,
    ProgramaAcademicoService,
    ProduccionAcademicaService,
    EnteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        DocumentoService,
        // NotificacionesService,
        WebsocketService,
      ],
    };
  }
}
