import { TipoProyecto } from './tipo_proyecto';


export class PropuestaGrado {
  Id: number;
  Nombre: string;
  Resumen: string;
  Grupoinvestigacion: string;
  Lineainvestigacion: string;
  Duracion: string;
  UnidadTiempo: number;
  TipoProyecto: TipoProyecto;
  Lugarejecucion: string;
}
