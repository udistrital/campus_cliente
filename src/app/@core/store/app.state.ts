import { TipoLugar } from '../data/models/tipo_lugar';
import { TipoDiscapacidad } from '../data/models/tipo_discapacidad';
import { TipoContacto } from '../data/models/tipo_contacto';
import { ProgramaAcademico } from '../data/models/programa_academico';
import { NivelIdioma } from '../data/models/nivel_idioma';
import { NivelFormacion } from '../data/models/nivel_formacion';
import { Metodologia } from '../data/models/metodologia';
import { Lugar } from '../data/models/lugar';
import { LineaInvestigacion } from '../data/models/linea_investigacion';
import { Idioma } from '../data/models/idioma';
import { GrupoEtnico } from '../data/models/grupo_etnico';
import { EstadoCivil } from '../data/models/estado_civil';
import { EstadoInscripcion } from '../data/models/estado_inscripcion';
import { ClasificacionNivelIdioma } from '../data/models/clasificacion_idioma';
import { Genero } from '../data/models/genero';
import { Titulacion } from '../data/models/titulacion';
import { TipoIdentificacion } from '../data/models/tipo_identificacion';
import { TipoProyecto } from '../data/models/tipo_proyecto';
import { GrupoInvestigacion } from '../data/models/grupo_investigacion';
<<<<<<< HEAD
=======
import { PeriodoAcademico } from '../data/models/periodo_academico';
// import { TipoPublicacionLibro } from '../data/models/tipo_publicacion_libro';

>>>>>>> 3bdb100385149f9d2af94002b6760f5b105b9a73
export interface IAppState {
  listGenero: Genero[],
  listClasificacionNivelIdioma: ClasificacionNivelIdioma[],
  listEstadoInscripcion: EstadoInscripcion[],
  listEstadoCivil: EstadoCivil[],
  listGrupoEtnico: GrupoEtnico[],
  listIdioma: Idioma[],
  listLineaInvestigacion: LineaInvestigacion[],
  listPais: Lugar[],
  listCiudad: Lugar[],
  listLugar: Lugar[],
  listMetodologia: Metodologia[],
  listNivelFormacion: NivelFormacion[],
  listNivelIdioma: NivelIdioma[],
  listProgramaAcademico: ProgramaAcademico[],
  listTipoContacto: TipoContacto[],
  listTipoDiscapacidad: TipoDiscapacidad[],
  listTipoLugar: TipoLugar[],
  listTitulacion: Titulacion[],
  listTipoIdentificacion: TipoIdentificacion[],
  listTipoProyecto: TipoProyecto[],
  listGrupoInvestigacion: GrupoInvestigacion[],
  listPeriodoAcademico: PeriodoAcademico[],
  // listTipoPublicacionLibro: TipoPublicacionLibro[],
}
