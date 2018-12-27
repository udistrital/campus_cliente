import { TipoProyecto } from './tipo_proyecto';
import { LineaInvestigacion } from './linea_investigacion';
import { GrupoInvestigacion } from './grupo_investigacion';

export class PropuestaGrado {
  Id: number;
  Nombre: string;
  Resumen: string;
  GrupoInvestigacion: GrupoInvestigacion;
  LineaInvestigacion: LineaInvestigacion;
  FormatoProyecto: string;
  Admision: number;
  TipoProyecto: TipoProyecto;
}
