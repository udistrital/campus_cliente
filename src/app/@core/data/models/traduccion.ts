import { TipoTraduccion } from './tipo_traduccion';
import { MedioDivulgacion } from './medio_divulgacion';

export class Traduccion {
  Persona: number;
  Tipotraduccion: TipoTraduccion;
  Titulo: string;
  Nombreoriginal: string;
  Autor: string;
  Idiomaoriginal: number;
  Idiomatraducido: number;
  Ano: number;
  Mes: number;
  Mediodivulgacion: MedioDivulgacion;
  Edicion: number;
  Serie: number;
}
