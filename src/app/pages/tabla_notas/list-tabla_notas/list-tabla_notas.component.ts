import { Component, OnInit, OnChanges } from '@angular/core';
import { IdiomaService } from '../../../@core/data/idioma.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { IAppState } from '../../../@core/store/app.state';
import { Store } from '@ngrx/store';
import { ListService } from '../../../@core/store/services/list.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AdmisionesService } from '../../../@core/data/admisiones.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'ngx-list-tabla-notas',
  templateUrl: './list-tabla_notas.component.html',
  styleUrls: ['./list-tabla_notas.component.scss'],
})
export class ListTablaNotasComponent implements OnInit, OnChanges {
  idioma: any = [];
  periodo = [];
  posgrados = [];
  selectedValueIdioma: any;
  selectedValuePeriodo: any;
  selectedValueprograma: any;
  resultados_notas = [];
  arrayBuffer: any;
  file: File;
  busqueda: boolean; // se usa en la seccion de subir las notas, para saber si es entrevista o idioma
  excel = [];

  constructor(private translate: TranslateService,
    private admisionesService: AdmisionesService,
    private programaService: ProgramaAcademicoService,
    private campusMidService: CampusMidService,
    private idiomaService: IdiomaService,
    private store: Store<IAppState>,
    private listService: ListService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      ;
    });
    this.listService.findPeriodoAcademico();
    this.listService.findIdioma();
    this.loadLists();
    this.loadPrograma();
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
      this.busqueda = true;
      this.excel = [];
      this.BusquedaDatos_idioma(`conocimiento_idioma/?query=Idioma:${this.selectedValueIdioma['Id']},Periodo:${this.selectedValuePeriodo['Id']},Nativo:false`);
    }
  }

  Filtrar_entrevista() {
    if ((this.selectedValueprograma !== undefined && this.selectedValueprograma !== 0)
      && (this.selectedValuePeriodo !== undefined && this.selectedValuePeriodo !== 0)) {
      this.busqueda = false;
      this.excel = [];
      this.BusquedaDatos_entrevista(`admision/?query=ProgramaAcademico:${this.selectedValueprograma['Id']},Periodo:${this.selectedValuePeriodo['Id']}`);
    }
  }

  ClearFiltro() {
    this.selectedValueIdioma = '--Seleccionar--'
    this.selectedValueIdioma = 0;
    this.selectedValuePeriodo = '--Seleccionar--'
    this.selectedValuePeriodo = 0;
    this.selectedValueprograma = '--Seleccionar--'
    this.selectedValueprograma = 0;
    this.resultados_notas = [];
    this.busqueda = false;
    this.excel = [];
  }

  BusquedaDatos_idioma(query) {
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

  BusquedaDatos_entrevista(query) {
    if (query) {
      this.admisionesService.get(query).subscribe(res => {
        if (res !== null) {
          this.resultados_notas = <any>res;
          this.CargarPersonas();
          this.CargarNotas_entre();
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
      if ((datos.Persona === null) || (datos.Persona === undefined)) {
        datos.Persona = datos.Aspirante;
      } else {
        datos.Persona = datos.Persona;
      }
      this.campusMidService.get(`persona/ConsultaPersona/?id=${datos.Persona}`)
        .subscribe(res_aspirante => {
          if (res_aspirante !== null) {
            const aspirante = `${res_aspirante['PrimerApellido']} ${res_aspirante['SegundoApellido']}
                ${res_aspirante['PrimerNombre']} ${res_aspirante['SegundoNombre']}`
            this.resultados_notas[index].Persona = aspirante;
            this.resultados_notas[index].NumeroDocumento = res_aspirante['NumeroDocumento'];
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

  CargarNotas_entre() {
    for (let i = 0; i < this.resultados_notas.length; i++) {
      // console.info(this.resultados_notas[i]);
      this.admisionesService.get(`nota_entrevista/?query=Admision:${this.resultados_notas[i]['Id']}`)
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
              const nota_entre = {
                Admision: {
                  Id: this.resultados_notas[i]['Id'],
                },
                ValorNota: this.resultados_notas[i]['nota'],
              }
              if (this.busqueda === true) {
                this.idiomaService.post('valor_nota', nota)
                  .subscribe(res => {
                    if (res !== null) {
                      // this.resultados_notas = <any>res;
                      // this.CargarPersonas();
                      this.Filtrar();
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
              } else {
                this.admisionesService.post('nota_entrevista', nota_entre)
                  .subscribe(res => {
                    if (res !== null) {
                      // this.resultados_notas = <any>res;
                      // this.CargarPersonas();
                      this.Filtrar_entrevista();
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
              const nota_entre = {
                Id: this.resultados_notas[i]['id_nota'],
                Admision: {
                  Id: this.resultados_notas[i]['Id'],
                },
                ValorNota: this.resultados_notas[i]['nota'],
              }
              if (this.busqueda === true) {
                this.idiomaService.put('valor_nota', nota)
                  .subscribe(res => {
                    if (res !== null) {
                      // this.resultados_notas = <any>res;
                      // this.CargarPersonas();
                      this.Filtrar();
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
              } else {
                this.admisionesService.put('nota_entrevista', nota_entre, nota_entre['Id'])
                  .subscribe(res => {
                    if (res !== null) {
                      // this.resultados_notas = <any>res;
                      // this.CargarPersonas();
                      this.Filtrar_entrevista();
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
          }
          // this.ClearFiltro();
          // if (this.busqueda === true) {
          //   this.Filtrar();
          // } else {
          //   this.Filtrar_entrevista();
          // }
        }
      });
  }

  incomingfile(event) {
    this.file = event.target.files[0];
  }

  Upload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      // console.info(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      this.excel = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      console.info(this.excel);
      this.AsignarNotasExcel();
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  AsignarNotasExcel() {
    for (let index = 0; index < this.excel.length; index++) {
      const carga = this.excel[index];
      console.info(carga);
      for (let index_2 = 0; index_2 < this.resultados_notas.length; index_2++) {
        const persona = this.resultados_notas[index_2];
        // console.info(persona);
        if (carga['Documento'].toString() === persona['NumeroDocumento']) {
            console.info('son la misma persona')
            this.resultados_notas[index_2]['nota'] = carga['Nota'];
            this.mostarNota(index_2);
        }
      }
    }
  }

  public loadLists() {
    this.store.select((state) => state).subscribe(
      (list) => {
        this.idioma[0] = list.listIdioma[0];
        this.periodo[0] = list.listPeriodoAcademico[0];
      },
    );
  }

  loadPrograma() {
    this.programaService.get('programa_academico/?limit=0')
      .subscribe(res => {
        const r = <any>res;
        if (res !== null && r.Type !== 'error') {
          this.posgrados = <any>res;
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
