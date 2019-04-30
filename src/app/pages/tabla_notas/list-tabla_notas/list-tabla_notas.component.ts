import { Component, OnInit, OnChanges } from '@angular/core';
import { IdiomaService } from '../../../@core/data/idioma.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { IAppState } from '../../../@core/store/app.state';
import { Store } from '@ngrx/store';
import { ListService } from '../../../@core/store/services/list.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonaService } from '../../../@core/data/persona.service';

@Component({
  selector: 'ngx-list-tabla-notas',
  templateUrl: './list-tabla_notas.component.html',
  styleUrls: ['./list-tabla_notas.component.scss'],
})
export class ListTablaNotasComponent implements OnInit, OnChanges {
  idioma: any = [];
  periodo = [];
  selectedValueIdioma: any;
  selectedValuePeriodo: any;
  resultados_notas = [];

  constructor(private translate: TranslateService,
    private idiomaService: IdiomaService,
    private personaService: PersonaService,
    private store: Store<IAppState>,
    private listService: ListService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      ;
    });
    this.listService.findPeriodoAcademico();
    this.listService.findIdioma();
    this.loadLists();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  Filtrar() {
    if ((this.selectedValueIdioma !== undefined && this.selectedValueIdioma !== 0)
      && (this.selectedValuePeriodo !== undefined && this.selectedValuePeriodo !== 0)) {
      this.BusquedaDatos(`conocimiento_idioma/?query=Idioma:${this.selectedValueIdioma['Id']},Periodo:${this.selectedValuePeriodo['Id']},Nativo:false`);
    }
  }

  ClearFiltro() {
    this.selectedValueIdioma = '--Seleccionar--'
    this.selectedValueIdioma = 0;
    this.selectedValuePeriodo = '--Seleccionar--'
    this.selectedValuePeriodo = 0;
    this.resultados_notas = [];
  }

  BusquedaDatos(query) {
    if (query) {
      this.idiomaService.get(query).subscribe(res => {
        if (res !== null) {
          this.resultados_notas = <any>res;
          this.CargarPersonas();
          this.CargarNotas();
        } else {
          Swal({
            type: 'info',
            title: this.translate.instant('GLOBAL.warning'),
            text: `no se encontraron resultados`,
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        }
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
    }
  }

  CargarPersonas() {
    for (let index = 0; index < this.resultados_notas.length; index++) {
      const datos = this.resultados_notas[index];
      this.personaService.get(`persona?query=Ente:${datos.Persona}`)
        .subscribe(res_aspirante => {
          if (res_aspirante !== null) {
            const aspirante = `${res_aspirante[0].PrimerApellido} ${res_aspirante[0].SegundoApellido}
                ${res_aspirante[0].PrimerNombre} ${res_aspirante[0].SegundoNombre}`
            this.resultados_notas[index].Persona = aspirante;
            // if ( index === (this.resultados_notas.length - 1 ) ) {
            //   // this.source.load(data);
            // }
          }
        },
          (error_aspirante: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error_aspirante.status + '',
              text: this.translate.instant('ERROR.' + error_aspirante.status),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    }
  }

  CargarNotas() {
    for (let i = 0; i < this.resultados_notas.length; i++) {
      this.idiomaService.get(`valor_nota/?query=ConocimientoIdioma:${this.resultados_notas[i]['Id']}`)
        .subscribe(res_notas => {
          if (res_notas !== null) {
            this.resultados_notas[i]['GetNota'] = <any>res_notas[0]['ValorNota'];
            this.resultados_notas[i]['id_nota'] = <any>res_notas[0]['Id'];
          }
        },
          (error_notas: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error_notas.status + '',
              text: this.translate.instant('ERROR.' + error_notas.status),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    }
  }

  mostarNota(index: number) {
    if ((this.resultados_notas[index]['nota'] <= 100) && (this.resultados_notas[index]['nota'] >= 0)) {
      this.resultados_notas[index]['modificado'] = true;
    } else {
      this.resultados_notas[index]['nota'] = null;
      Swal({
        type: 'error',
        title: this.translate.instant('GLOBAL.error'),
        text: `Ingrese una nota entre 0 y 100`,
        confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      });
    }
  }

  GuardarNota() {
    const opt: any = {
      title: this.translate.instant('GLOBAL.crear'),
      text: this.translate.instant('Guardar Nota'),
      icon: 'warning',
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          for (let i = 0; i < this.resultados_notas.length; i++) {
            // el siguiente bloque de codigo crea las notas por primera vez
            if ((this.resultados_notas[i]['modificado']) && (!this.resultados_notas[i]['GetNota'])) {
              const nota = {
                ConocimientoIdioma: {
                  Id: this.resultados_notas[i]['Id'],
                },
                ValorNota: this.resultados_notas[i]['nota'],
              }
              this.idiomaService.post('valor_nota', nota)
                .subscribe(res => {
                  if (res !== null) {
                    this.resultados_notas = <any>res;
                    this.CargarPersonas();
                  }
                },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                    });
                  });
            }
            // el siguiente bloque de codigo con el if hace un put a las notas
            if ((this.resultados_notas[i]['modificado']) && (this.resultados_notas[i]['GetNota'])) {
              const nota = {
                Id: this.resultados_notas[i]['id_nota'],
                ConocimientoIdioma: {
                  Id: this.resultados_notas[i]['Id'],
                },
                Porcentaje: 100,
                ValorNota: this.resultados_notas[i]['nota'],
              }
              this.idiomaService.put('valor_nota', nota)
                .subscribe(res => {
                  if (res !== null) {
                    this.resultados_notas = <any>res;
                    this.CargarPersonas();
                  }
                },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                    });
                  });
            }
          }
          this.Filtrar();
        }
      });
  }

  public loadLists() {
    this.store.select((state) => state).subscribe(
      (list) => {
        this.idioma[0] = list.listIdioma[0];
        this.periodo[0] = list.listPeriodoAcademico[0];
      },
    );
  }


}
