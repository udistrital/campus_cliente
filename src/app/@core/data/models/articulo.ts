import { TipoArticulo } from './tipo_articulo';
import { MedioDivulgacion } from './medio_divulgacion';

export class Articulo {
  Persona: number;
  Tipo: TipoArticulo;
  Nombre: string;
  Idioma: string;
  Ano: number;
  Mes: number;
  Revista: string;
  Volumen: number;
  Fasciculo: number;
  Serie: number;
  Ubicacion: number;
  Mediodivulgacion: MedioDivulgacion;
  Url: string;
  Doi: string;
}
