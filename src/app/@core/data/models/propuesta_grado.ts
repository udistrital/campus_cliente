import { TipoProyecto } from './tipo_proyecto';
import { LineaInvestigacion } from './linea_investigacion';
import {Lugar} from './lugar'

export class PropuestaGrado {
  Id: number;
  Nombre: string;
  Resumen: string;
  Grupoinvestigacion: string;
  LineaInvestigacion: LineaInvestigacion;
  Duracion: number;
  UnidadTiempo: number;
  TipoProyecto: TipoProyecto;
  Lugarejecucion: Lugar;
}
