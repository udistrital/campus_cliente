import { InscripcionRoutingModule, routedComponents } from './inscripcion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { ToasterModule } from 'angular2-toaster';
import { PersonaService } from '../../@core/data/persona.service';
import { CampusMidService } from '../../@core/data/campus_mid.service';
import { UbicacionesService } from '../../@core/data/ubicaciones.service';
import { CrudInfoCaracteristicaComponent } from '../info_caracteristica/crud-info_caracteristica/crud-info_caracteristica.component';
import { CrudInformacionContactoComponent } from '../informacion_contacto/crud-informacion_contacto/crud-informacion_contacto.component';
import { CrudInfoPersonaComponent } from '../info_persona/crud-info_persona/crud-info_persona.component';
import { InformacionContactoModule } from '../informacion_contacto/informacion_contacto.module';
import { InfoPersonaModule } from '../info_persona/info_persona.module';
import { InfoCaracteristicaModule } from '../info_caracteristica/info_caracteristica.module';
import { ImplicitAutenticationService } from './../../@core/utils/implicit_autentication.service';
import { NuxeoService } from './../../@core/utils/nuxeo.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { UtilidadesService } from '../../@core/utils/utilidades.service';
import { IdiomasModule } from '../idiomas/idiomas.module';
import { ListIdiomasComponent } from '../idiomas/list-idiomas/list-idiomas.component';
import { CrudIdiomasComponent } from '../idiomas/crud-idiomas/crud-idiomas.component';
import { FormacionAcademicaModule } from '../formacion_academica/formacion_academica.module';
import { ListFormacionAcademicaComponent } from '../formacion_academica/list-formacion_academica/list-formacion_academica.component';
import { CrudFormacionAcademicaComponent } from '../formacion_academica/crud-formacion_academica/crud-formacion_academica.component';
import { ExperienciaLaboralModule } from '../experiencia_laboral/experiencia_laboral.module';
import { ListExperienciaLaboralComponent } from '../experiencia_laboral/list-experiencia_laboral/list-experiencia_laboral.component';
import { CrudExperienciaLaboralComponent } from '../experiencia_laboral/crud-experiencia_laboral/crud-experiencia_laboral.component';
import { ProgramaAcademicoService } from '../../@core/data/programa_academico.service';
import { ProduccionAcademicaService } from '../../@core/data/produccion_academica.service';
import { PropuestaGradoModule } from '../propuesta_grado/propuesta_grado.module';
import { CrudPropuestaGradoComponent } from '../propuesta_grado/crud-propuesta_grado/crud-propuesta_grado.component';
import { LibroModule } from '../libro/libro.module';
import { ListLibroComponent } from '../libro/list-libro/list-libro.component';
import { CrudLibroComponent } from '../libro/crud-libro/crud-libro.component';
import { ArticuloModule } from '../articulo/articulo.module';
import { ListArticuloComponent } from '../articulo/list-articulo/list-articulo.component';
import { CrudArticuloComponent } from '../articulo/crud-articulo/crud-articulo.component';
import { TraduccionModule } from '../traduccion/traduccion.module';
import { ListTraduccionComponent } from '../traduccion/list-traduccion/list-traduccion.component';
import { CrudTraduccionComponent } from '../traduccion/crud-traduccion/crud-traduccion.component';
import { OtroDocumentoModule } from '../otro_documento/otro_documento.module';
import { ListOtroDocumentoComponent } from '../otro_documento/list-otro_documento/list-otro_documento.component';
import { CrudOtroDocumentoComponent } from '../otro_documento/crud-otro_documento/crud-otro_documento.component';
import { OtraPublicacionModule } from '../otra_publicacion/otra_publicacion.module';
import { ListOtraPublicacionComponent } from '../otra_publicacion/list-otra_publicacion/list-otra_publicacion.component';
import { CrudOtraPublicacionComponent } from '../otra_publicacion/crud-otra_publicacion/crud-otra_publicacion.component';
import { ProduccionTecnicaModule } from '../produccion_tecnica/produccion_tecnica.module';
import { ListProduccionTecnicaComponent } from '../produccion_tecnica/list-produccion_tecnica/list-produccion_tecnica.component';
import { CrudProduccionTecnicaComponent } from '../produccion_tecnica/crud-produccion_tecnica/crud-produccion_tecnica.component';
import { ProduccionArtesArquDisenoModule } from '../produccion_artes_arqu_diseno/produccion_artes_arqu_diseno.module';
// tslint:disable-next-line:max-line-length
import { ListProduccionArtesArquDisenoComponent } from '../produccion_artes_arqu_diseno/list-produccion_artes_arqu_diseno/list-produccion_artes_arqu_diseno.component';
import { CrudProduccionArtesArquDisenoComponent } from '../produccion_artes_arqu_diseno/crud-produccion_artes_arqu_diseno/crud-produccion_artes_arqu_diseno.component';
@NgModule({
  imports: [
    ThemeModule,
    InscripcionRoutingModule,
    SharedModule,
    ToasterModule,
    InformacionContactoModule,
    InfoPersonaModule,
    InfoCaracteristicaModule,
    MatExpansionModule,
    IdiomasModule,
    FormacionAcademicaModule,
    ExperienciaLaboralModule,
    PropuestaGradoModule,
    LibroModule,
    ArticuloModule,
    TraduccionModule,
    OtroDocumentoModule,
    OtraPublicacionModule,
    ProduccionTecnicaModule,
    ProduccionArtesArquDisenoModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ImplicitAutenticationService,
    NuxeoService,
    PersonaService,
    CampusMidService,
    UbicacionesService,
    UtilidadesService,
    ProgramaAcademicoService,
    ProduccionAcademicaService,
  ],
  entryComponents: [
    ListIdiomasComponent,
    CrudIdiomasComponent,
    ListFormacionAcademicaComponent,
    CrudFormacionAcademicaComponent,
    ListExperienciaLaboralComponent,
    CrudExperienciaLaboralComponent,
    CrudInfoPersonaComponent,
    CrudInfoCaracteristicaComponent,
    CrudInformacionContactoComponent,
    CrudPropuestaGradoComponent,
    CrudLibroComponent,
    ListLibroComponent,
    CrudArticuloComponent,
    ListArticuloComponent,
    CrudTraduccionComponent,
    ListTraduccionComponent,
    CrudOtroDocumentoComponent,
    ListOtroDocumentoComponent,
    CrudProduccionTecnicaComponent,
    ListProduccionTecnicaComponent,
    CrudProduccionArtesArquDisenoComponent,
    ListProduccionArtesArquDisenoComponent,
  ],
})
export class InscripcionModule { }
