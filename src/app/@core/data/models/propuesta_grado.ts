import { TipoProyecto } from './tipo_proyecto';
import { Inscripcion } from './inscripcion';
import { GrupoInvestigacion } from './grupo_investigacion';

export class PropuestaGrado {
  Id: number;
  Nombre: string;
  Resumen: string;
  GrupoInvestigacion: GrupoInvestigacion;
  LineaInvestigacion: any;
  FormatoProyecto: string;
  DocumentoId: number;
  GrupoInvestigacionLineaInvestigacionId: number;
  InscripcionId: Inscripcion;
  TipoProyecto: TipoProyecto;
  TipoProyectoId: TipoProyecto;
}
