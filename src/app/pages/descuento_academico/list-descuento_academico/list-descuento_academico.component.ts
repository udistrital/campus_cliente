import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { DescuentoAcademicoService } from '../../../@core/data/descuento_academico.service';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { SolicitudDescuento } from '../../../@core/data/models/solicitud_descuento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-descuento-academico',
  templateUrl: './list-descuento_academico.component.html',
  styleUrls: ['./list-descuento_academico.component.scss'],
})
export class ListDescuentoAcademicoComponent implements OnInit {
  uid: number;
  persona: number;
  programa: number;
  periodo: number;
  admision: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  source: LocalDataSource = new LocalDataSource();
  data: Array<SolicitudDescuento>;
  solicituddescuento: any;

  @Input('persona_id')
  set info(info: number) {
    this.persona = info;
    this.loadData();
  }

  @Input('admision_id')
  set info2(info2: number) {
    this.admision = info2;
    this.loadData();
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  loading: boolean;
  percentage: number;

  constructor(private translate: TranslateService,
    private mid: CampusMidService,
    private descuento: DescuentoAcademicoService,
    private admisiones: InscripcionService,
    private toasterService: ToasterService) {
    this.persona = 12;
    this.admision = 5;
    this.loadData();
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadData();
      this.cargarCampos();
    });
    this.loading = false;
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
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      mode: 'external',
      columns: {
        DescuentoDependencia: {
          title: this.translate.instant('GLOBAL.tipo_descuento_matricula'),
          valuePrepareFunction: (value) => {
            return value.TipoDescuento.Nombre;
          },
        },
      },
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.admisiones.get('admision/' + this.admision)
      .subscribe(dato_admision => {
        const admisiondata = <any>dato_admision;
        this.programa = admisiondata.ProgramaAcademico;
        this.periodo = admisiondata.Periodo.Id;
        this.descuento.get('descuentos_dependencia/?query=DependenciaId:' + this.programa +
          ',PeriodoId:' + this.periodo + '&limit=0')
          .subscribe(descuentos => {
            const descuentosdependencia = <Array<any>>descuentos;
            this.data = [];
            descuentosdependencia.forEach(element => {
              this.descuento.get('solicitud_descuento/?query=DescuentosDependenciaId:' + element.Id + ',PersonaId:' + this.persona + '&limit=0')
                .subscribe(solicitud => {
                  if (solicitud !== null) {
                    this.solicituddescuento = <any>solicitud[0];
                    const id_aux = this.solicituddescuento.Id;
                    this.mid.get('descuentoacademico/descuentoacademico/?Id=' + this.persona + '&idsolicitud=' + id_aux)
                      .subscribe(res => {
                        if (res !== null) {
                          this.data.push(<SolicitudDescuento>res);
                          this.loading = false;
                          this.getPercentage(1);
                          this.source.load(this.data);
                        }
                      },
                        (error: HttpErrorResponse) => {
                          Swal({
                            type: 'error',
                            title: error.status + '',
                            text: this.translate.instant('ERROR.' + error.status),
                            footer: this.translate.instant('GLOBAL.cargar') + '-' +
                              this.translate.instant('GLOBAL.descuento_matricula'),
                            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                          });
                        });
                  }
                },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      footer: this.translate.instant('GLOBAL.cargar') + '-' +
                        this.translate.instant('GLOBAL.descuento_matricula'),
                      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                    });
                });
            });
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.cargar') + '-' +
                  this.translate.instant('GLOBAL.descuentos_dependencia'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.admision'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
      });
  }

  ngOnInit() {
    this.uid = 0;
    this.persona = 12;
    this.admision = 5;
  }

  onEdit(event): void {
    this.uid = event.data.Id;
  }

  onCreate(event): void {
    this.uid = 0;
  }

  onDelete(event): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.eliminar'),
      text: this.translate.instant('GLOBAL.eliminar') + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    };
    Swal(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          this.mid.delete('descuentoacademico/descuentoacademico', event.data).subscribe(res => {
            if (res !== null) {
              this.loadData();
              this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
                this.translate.instant('GLOBAL.descuento_matricula') + ' ' +
                this.translate.instant('GLOBAL.confirmarEliminar'));
            }
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.eliminar') + '-' +
                  this.translate.instant('GLOBAL.descuento_matricula'),
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
      this.uid = 0;
      this.persona = 12;
      this.admision = 5;
      this.loadData();
    }
  }

  itemselec(event): void {
  }

  getPercentage(event) {
    this.percentage = event;
    this.result.emit(this.percentage);
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
