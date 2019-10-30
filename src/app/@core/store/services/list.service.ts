import { PersonaService } from '../../data/persona.service';
import { Injectable } from '@angular/core';
import { IAppState } from '../app.state';
import { Store } from '@ngrx/store';
import { REDUCER_LIST } from '../reducer.constants';
import { InscripcionService } from '../../data/inscripcion.service';
import { CoreService } from '../../data/core.service';
import { IdiomaService } from '../../data/idioma.service';
import { UbicacionService } from '../../data/ubicacion.service';
import { ProgramaAcademicoService } from '../../data/programa_academico.service';
import { EnteService } from '../../data/ente.service';
@Injectable()
export class ListService {

  constructor(
    private personaService: PersonaService,
    private inscripcionService: InscripcionService,
    private idiomaService: IdiomaService,
    private coreService: CoreService,
    private ubicacionService: UbicacionService,
    private programaAcademicoService: ProgramaAcademicoService,
    // private producccionAcademicaService: ProduccionAcademicaService,
    private enteService: EnteService,
    private store: Store<IAppState>) {

  }


  public findGenero() {
    this.store.select(REDUCER_LIST.Genero).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.personaService.get('genero/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.Genero, result);
              },
              error => {
                this.addList(REDUCER_LIST.Genero, []);
              },
            );
        }
      },
    );
  }

  public findClasificacionNivelIdioma() {
    this.store.select(REDUCER_LIST.ClasificacionNivelIdioma).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.idiomaService.get('clasificacion_nivel_idioma/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.ClasificacionNivelIdioma, result);
              },
              error => {
                this.addList(REDUCER_LIST.ClasificacionNivelIdioma, []);
              },
            );
        }
      },
    );
  }

  public findEstadoInscripcion() {
    this.store.select(REDUCER_LIST.EstadoInscripcion).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.inscripcionService.get('estado_inscripcion/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.EstadoInscripcion, result);
              },
              error => {
                this.addList(REDUCER_LIST.EstadoInscripcion, []);
              },
            );
        }
      },
    );
  }

  public findEstadoCivil() {
    this.store.select(REDUCER_LIST.EstadoCivil).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.personaService.get('estado_civil/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.EstadoCivil, result);
              },
              error => {
                this.addList(REDUCER_LIST.EstadoCivil, []);
              },
            );
        }
      },
    );
  }

  public findGrupoEtnico() {
    this.store.select(REDUCER_LIST.GrupoEtnico).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.personaService.get('grupo_etnico/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.GrupoEtnico, result);
              },
              error => {
                this.addList(REDUCER_LIST.GrupoEtnico, []);
              },
            );
        }
      },
    );
  }

  public findIdioma() {
    this.store.select(REDUCER_LIST.Idioma).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.idiomaService.get('idioma/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.Idioma, result);
              },
              error => {
                this.addList(REDUCER_LIST.Idioma, []);
              },
            );
        }
      },
    );
  }

  public findLineaInvestigacion() {
    this.store.select(REDUCER_LIST.LineaInvestigacion).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.coreService.get('linea_investigacion/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.LineaInvestigacion, result);
              },
              error => {
                this.addList(REDUCER_LIST.LineaInvestigacion, []);
              },
            );
        }
      },
    );
  }

  public findPais() {
    this.store.select(REDUCER_LIST.Pais).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.ubicacionService.get('lugar/?query=TipoLugar.Nombre:PAIS,Activo:true&limit=0') // TODO: filtrar pais
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.Pais, result);
              },
              error => {
                this.addList(REDUCER_LIST.Pais, []);
              },
            );
        }
      },
    );
  }

  public findCiudad() {
    this.store.select(REDUCER_LIST.Ciudad).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.ubicacionService.get('lugar/?query=Activo:true&limit=0') // TODO: filtrar ciudad
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.Ciudad, result);
              },
              error => {
                this.addList(REDUCER_LIST.Ciudad, []);
              },
            );
        }
      },
    );
  }

  public findLugar() {
    this.store.select(REDUCER_LIST.Lugar).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.ubicacionService.get('lugar/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.Lugar, result);
              },
              error => {
                this.addList(REDUCER_LIST.Lugar, []);
              },
            );
        }
      },
    );
  }

  public findMetodologia() {
    this.store.select(REDUCER_LIST.Metodologia).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.programaAcademicoService.get('metodologia/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.Metodologia, result);
              },
              error => {
                this.addList(REDUCER_LIST.Metodologia, []);
              },
            );
        }
      },
    );
  }

  public findNivelFormacion() {
    this.store.select(REDUCER_LIST.NivelFormacion).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.programaAcademicoService.get('nivel_formacion/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.NivelFormacion, result);
              },
              error => {
                this.addList(REDUCER_LIST.NivelFormacion, []);
              },
            );
        }
      },
    );
  }

  public findNivelIdioma() {
    this.store.select(REDUCER_LIST.NivelIdioma).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.idiomaService.get('valor_nivel_idioma/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.NivelIdioma, result);
              },
              error => {
                this.addList(REDUCER_LIST.NivelIdioma, []);
              },
            );
        }
      },
    );
  }

  public findProgramaAcademico() {
    this.store.select(REDUCER_LIST.ProgramaAcademico).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.programaAcademicoService.get('programa_academico/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.ProgramaAcademico, result);
              },
              error => {
                this.addList(REDUCER_LIST.ProgramaAcademico, []);
              },
            );
        }
      },
    );
  }

  public findTipoContacto() {
    this.store.select(REDUCER_LIST.TipoContacto).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.enteService.get('tipo_contacto/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.TipoContacto, result);
              },
              error => {
                this.addList(REDUCER_LIST.TipoContacto, []);
              },
            );
        }
      },
    );
  }

  public findTipoDiscapacidad() {
    this.store.select(REDUCER_LIST.TipoDiscapacidad).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.personaService.get('tipo_discapacidad/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.TipoDiscapacidad, result);
              },
              error => {
                this.addList(REDUCER_LIST.TipoDiscapacidad, []);
              },
            );
        }
      },
    );
  }

  public findTipoLugar() {
    this.store.select(REDUCER_LIST.TipoLugar).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.ubicacionService.get('tipo_lugar/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.TipoLugar, result);
              },
              error => {
                this.addList(REDUCER_LIST.TipoLugar, []);
              },
            );
        }
      },
    );
  }

  public findTitulacion() {
    this.store.select(REDUCER_LIST.Titulacion).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.programaAcademicoService.get('titulacion/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.Titulacion, result);
              },
              error => {
                this.addList(REDUCER_LIST.Titulacion, []);
              },
            );
        }
      },
    );
  }

  public findTipoIdentificacion() {
    this.store.select(REDUCER_LIST.TipoIdentificacion).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.enteService.get('tipo_identificacion/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.TipoIdentificacion, result);
              },
              error => {
                this.addList(REDUCER_LIST.TipoIdentificacion, []);
              },
            );
        }
      },
    );
  }

  public findTipoProyecto() {
    this.store.select(REDUCER_LIST.TipoProyecto).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.inscripcionService.get('tipo_proyecto/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.TipoProyecto, result);
              },
              error => {
                this.addList(REDUCER_LIST.TipoProyecto, []);
              },
            );
        }
      },
    );
  }

  public findGrupoInvestigacion() {
    this.store.select(REDUCER_LIST.GrupoInvestigacion).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.coreService.get('grupo_investigacion/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.GrupoInvestigacion, result);
              },
              error => {
                this.addList(REDUCER_LIST.GrupoInvestigacion, []);
              },
            );
        }
      },
    );
  }

  public findPeriodoAcademico() {
    this.store.select(REDUCER_LIST.PeriodoAcademico).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.coreService.get('periodo/?query=Activo:true&limit=0')
            .subscribe(
              (result: any[]) => {
                this.addList(REDUCER_LIST.PeriodoAcademico, result);
              },
              error => {
                this.addList(REDUCER_LIST.PeriodoAcademico, []);
              },
            );
        }
      },
    );
  }

  private addList(type: string, object: Array<any>) {
    this.store.dispatch({
      type: type,
      payload: object,
    });
  }
}
