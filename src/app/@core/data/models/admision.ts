import { EstadoAdmision } from './estado_admision';
import { PeriodoAcademico } from './periodo_academico';

export class Admision {
  Id: number;
  Aspirante: number;
  ProgramaAcademico: number;
  ReciboMatricula: number;
  ReciboInscripcion: number;
  Periodo: PeriodoAcademico;
  EstadoAdmision: EstadoAdmision;
  AceptaTerminos: boolean;
}
