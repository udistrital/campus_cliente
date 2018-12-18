import { TipoProyecto } from './tipo_proyecto';
import { LineaInvestigacion } from './linea_investigacion';
import { EnfasisProyecto } from './enfasis_proyecto';
import { GrupoInvestigacion } from './grupo_investigacion';

export class PropuestaGrado {
  Id: number;
  Nombre: string;
  Resumen: string;
  Grupoinvestigacion: GrupoInvestigacion;
  LineaInvestigacion: LineaInvestigacion;
  Formatoproyecto: string;
  Admision: number;
  TipoProyecto: TipoProyecto;
  EnfasisProyecto: EnfasisProyecto;
}
