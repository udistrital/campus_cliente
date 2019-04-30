import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { UserService } from '../../../@core/data/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { UbicacionesService } from '../../../@core/data/ubicaciones.service';

@Component({
  selector: 'ngx-list-formacion-academica',
  templateUrl: './list-formacion_academica.component.html',
  styleUrls: ['./list-formacion_academica.component.scss'],
})
export class ListFormacionAcademicaComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  source: LocalDataSource = new LocalDataSource();

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  loading: boolean;
  percentage: number;

  constructor(private translate: TranslateService,
    private toasterService: ToasterService,
    private userService: UserService,
    private campusMidService: CampusMidService,
    private ubicacionesService: UbicacionesService,
    private programaAcademicoService: ProgramaAcademicoService) {
    this.loadData();
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
    this.loading = false;
  }

  getPercentage(event) {
    this.percentage = event;
    this.result.emit(this.percentage);
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
        NivelFormacion: {
          title: this.translate.instant('GLOBAL.nivel_formacion'),
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        PaisUniversidad: {
          title: this.translate.instant('GLOBAL.pais_universidad'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        NombreUniversidad: {
          title: this.translate.instant('GLOBAL.nombre_universidad'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Titulacion: {
          title: this.translate.instant('GLOBAL.programa_academico'),
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Metodologia: {
          title: this.translate.instant('GLOBAL.metodologia'),
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        FechaFinalizacion: {
          title: this.translate.instant('GLOBAL.fecha_fin'),
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

  loadData(): void {
    this.loading = true;
    this.campusMidService.get('formacion/formacionacademicaente/?Ente=' + this.userService.getEnte())
      .subscribe(res => {
        if (res !== null) {
          const data = <Array<any>>res;
          const data_info = <Array<any>>[];
          data.forEach(element => {
            if (element.Titulacion !== null && element.Titulacion !== undefined) {
              this.programaAcademicoService.get('programa_academico/?query=id:' + element.Titulacion)
                .subscribe(programa => {
                  if (programa !== null) {
                    const programa_info = <any>programa[0];
                    element.Titulacion = programa_info;
                    element.Metodologia = programa_info.Metodologia;
                    element.NivelFormacion = programa_info.NivelFormacion;
                    this.campusMidService.get('organizacion/identificacionente/?Ente=' + programa_info.Institucion)
                      .subscribe(organizacion => {
                        if (organizacion !== null) {
                          const organizacion_info = <any>organizacion;
                          element.NombreUniversidad = organizacion_info.Nombre;
                          this.ubicacionesService.get('lugar/' + organizacion_info.Ubicacion[0].UbicacionEnte.Lugar)
                            .subscribe(pais => {
                              if (pais !== null) {
                                const pais_info = <any>pais;
                                element.PaisUniversidad = pais_info.Nombre;
                                data_info.push(element);
                                this.loading = false;
                                this.getPercentage(1);
                                this.source.load(data_info);
                              }
                            },
                              (error: HttpErrorResponse) => {
                                Swal({
                                  type: 'error',
                                  title: error.status + '',
                                  text: this.translate.instant('ERROR.' + error.status),
                                  footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                    this.translate.instant('GLOBAL.formacion_academica') + '|' +
                                    this.translate.instant('GLOBAL.pais_universidad'),
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
                              this.translate.instant('GLOBAL.formacion_academica') + '|' +
                              this.translate.instant('GLOBAL.nombre_universidad'),
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
                        this.translate.instant('GLOBAL.formacion_academica') + '|' +
                        this.translate.instant('GLOBAL.programa_academico'),
                      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                    });
                  });
            }
          });
        }
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.formacion_academica'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  ngOnInit() {
  }

  activetab(): void {
    this.cambiotab = !this.cambiotab;
  }

  onEdit(event): void {
    this.uid = event.data.Id;
    console.info(event.data.Id);
  }

  onCreate(event): void {
    this.uid = 0;
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
    }
  }

  itemselec(event): void {
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
          this.campusMidService.delete('formacion/formacionacademica/', event.data).subscribe(res => {
            if (res !== null) {
              this.loadData();
              this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
                this.translate.instant('GLOBAL.formacion_academica') + ' ' +
                this.translate.instant('GLOBAL.confirmarEliminar'));
            }
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.eliminar') + '-' +
                  this.translate.instant('GLOBAL.formacion_academica'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
        }
      });
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
