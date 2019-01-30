import { TipoPublicacionLibro } from './tipo_publicacion_libro';
import { MedioDivulgacion } from './medio_divulgacion';
import { MedioPublicacion } from './medio_publicacion';
import { Lugar } from './lugar'

export class Libro {
  Persona: number;
  Titulolibro: string;
  TipoPublicacion: TipoPublicacionLibro;
  Titulocapitulo: string;
  Paginas: number;
  Ano: number;
  Mes: number;
  Isbn: number;
  Ubicacion: number;
  Mediodivulgacion: MedioDivulgacion;
  Mediopublicacion: MedioPublicacion;
  Editorial: string;
}
