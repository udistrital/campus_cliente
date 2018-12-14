import { TipoProyecto } from './tipo_proyecto';
import { LineaInvestigacion } from './linea_investigacion';
import { EnfasisProyecto } from './enfasis_proyecto';
import { GruproInvestigacion } from './grupro_investigacion';

export class PropuestaGrado {
  Id: number;
  Nombre: string;
  Resumen: string;
  Grupoinvestigacion: GruproInvestigacion;
  LineaInvestigacion: LineaInvestigacion;
  Enfasis: EnfasisProyecto;
  TipoProyecto: TipoProyecto;
  Formatoproyecto: string;
}
