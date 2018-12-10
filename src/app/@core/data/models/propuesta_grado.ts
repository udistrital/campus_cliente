import { TipoProyecto } from './tipo_proyecto';
import { LineaInvestigacion } from './linea_investigacion';
import { Enfasis } from './enfasis'

export class PropuestaGrado {
  Id: number;
  Nombre: string;
  Resumen: string;
  Grupoinvestigacion: string;
  LineaInvestigacion: LineaInvestigacion;
  Enfasis: Enfasis;
  TipoProyecto: TipoProyecto;
  Formatoproyecto: string;
}
