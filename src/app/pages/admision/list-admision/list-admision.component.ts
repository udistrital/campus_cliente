import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AdmisionesService } from '../../../@core/data/admisiones.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
import { PersonaService } from '../../../@core/data/persona.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-list-admision',
  templateUrl: './list-admision.component.html',
  styleUrls: ['./list-admision.component.scss'],
  })
export class ListAdmisionComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  posgrados = [];
  periodo = [];
  selectedValuePrograma: any;
  selectedValuePeriodo: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService,
    private admisionesService: AdmisionesService,
    private toasterService: ToasterService,
    private personaService: PersonaService,
    private router: Router,
    private programaService: ProgramaAcademicoService) {
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
    this.loadInfoSelectFiltro();
  }

  cargarCampos() {
    this.settings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-person"></i>', // este boton no elimina, sera usado para informacion
        // confirmDelete: true,
      },
      actions: {
        add: false,
        edit: false,
        delete: true,
        // custom: [{ name: 'ourVerInfo', title: '<i class="nb-person"></i>' }],
        // position: 'right'
      },
      mode: 'external',
      columns: {
        Aspirante: {
          title: this.translate.instant('GLOBAL.aspirante'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        ProgramaAcademico: {
          title: this.translate.instant('GLOBAL.programa_academico'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            const num = parseInt(value, 10);
            return this.posgrados[num - 1].Nombre.toString();
          },
        },
        Periodo: {
          title: this.translate.instant('GLOBAL.periodo'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        EstadoAdmision: {
          title: this.translate.instant('GLOBAL.estado_admision'),
          // type: 'estado_admision;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Enfasis: {
          title: 'Enfasis',
          // type: 'estado_admision;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        AceptaTerminos: {
          title: 'Acepta Terminos',
          // type: 'estado_admision;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
      },
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(query?: string): void {
    if (query) {
      this.admisionesService.get(query).subscribe(res => {
        if (res !== null) {
          const data = <Array<any>>res;
          for (let index = 0; index < data.length; index++) {
            const datos = data[index];
            this.personaService.get(`persona?query=Ente:${datos.Aspirante}`)
                    .subscribe(res_aspirante => {
                      if (res_aspirante !== null) {
                        const aspirante = `${res_aspirante[0].PrimerApellido} ${res_aspirante[0].SegundoApellido}
                        ${res_aspirante[0].PrimerNombre} ${res_aspirante[0].SegundoNombre}`
                        data[index].Aspirante = aspirante;
                        if ( index === (data.length - 1 ) ) {
                          this.source.load(data);
                        }
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
    } else {
      this.admisionesService.get('admision/?limit=0').subscribe(res => {
        if (res !== null) {
          const data = <Array<any>>res;
          // data.forEach(function persona (dato): void {
          //   console.info(dato.Aspirante)
          // });
          for (let index = 0; index < data.length; index++) {
            const datos = data[index];
            this.personaService.get(`persona?query=Ente:${datos.Aspirante}`)
                    .subscribe(res_aspirante => {
                      if (res_aspirante !== null) {
                        const aspirante = `${res_aspirante[0].PrimerApellido} ${res_aspirante[0].SegundoApellido}
                        ${res_aspirante[0].PrimerNombre} ${res_aspirante[0].SegundoNombre}`
                        data[index].Aspirante = aspirante;
                        if ( index === (data.length - 1 ) ) {
                          this.source.load(data);
                        }
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

  ngOnInit() {
  }

  onEdit(event): void {
    this.uid = event.data.Id;
    console.info(event.data)
    this.activetab();
  }

  onCreate(event): void {
    this.uid = 0;
    this.activetab();
  }
  onVerInfo(event): void {
    console.info('info chida')
    this.router.navigate( ['/pages/detalleInfo', event.data.Id] )
  }

  onDelete(event): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.eliminar'),
      text: this.translate.instant('GLOBAL.eliminar') + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.admisionesService.delete('admision/', event.data).subscribe(res => {
          if (res !== null) {
            this.loadData();
            this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
            this.translate.instant('GLOBAL.admision') + ' ' +
            this.translate.instant('GLOBAL.confirmarEliminar'));
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
    });
  }

  activetab(): void {
    this.cambiotab = !this.cambiotab;
  }

  selectTab(event): void {
    if (event.tabTitle === this.translate.instant('GLOBAL.lista')) {
      this.cambiotab = false;
    } else {
      this.cambiotab = true;
    }
  }

  onChange(event) {
    if (event) {
      this.loadData();
      this.cambiotab = !this.cambiotab;
    }
  }

  itemselec(event): void {
     // console.info(event);
  }

  loadInfoSelectFiltro() {
    this.programaService.get('programa_academico/?limit=0')
      .subscribe(res => {
        const r = <any>res;
        if (res !== null && r.Type !== 'error') {
          this.posgrados = <any>res;
          this.loadData();
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
      this.admisionesService.get('periodo_academico/?limit=0')
      .subscribe(res => {
        const r = <any>res;
        if (res !== null && r.Type !== 'error') {
          this.periodo = <any>res;
          this.loadData();
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

  Filtrar() {
    if (this.selectedValuePrograma && !this.selectedValuePeriodo) {
      this.loadData(`admision/?query=ProgramaAcademico:${this.selectedValuePrograma.Id}`);
    } else if ( !this.selectedValuePrograma && this.selectedValuePeriodo ) {
      this.loadData(`admision/?query=Periodo:${this.selectedValuePeriodo.Id}`);
    } else if ( (this.selectedValuePrograma !== undefined && this.selectedValuePrograma !== 0 )
    && (this.selectedValuePeriodo !== undefined && this.selectedValuePeriodo !== 0 ) ) {
      this.loadData(`admision/?query=ProgramaAcademico:${this.selectedValuePeriodo.Id},Periodo:${this.selectedValuePeriodo.Id}`);
    } else {
      this.loadData();
    }
  }

  ClearFiltro() {
    this.loadData();
    this.selectedValuePrograma = '--Seleccionar--'
    this.selectedValuePrograma = 0;
    this.selectedValuePeriodo = '--Seleccionar--'
    this.selectedValuePeriodo = 0;
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      // 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center'
      positionClass: 'toast-top-center',
      timeout: 5000,  // ms
      newestOnTop: true,
      tapToDismiss: false, // hide on click
      preventDuplicates: true,
      animation: 'slideDown', // 'fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'
      limit: 5,
    });
    const toast: Toast = {
      type: type, // 'default', 'info', 'success', 'warning', 'error'
      title: title,
      body: body,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

}
