import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
// import { UserService } from '../../../@core/data/users.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ProduccionAcademicaPost } from './../../../@core/data/models/produccion_academica';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { formatDate } from '@angular/common';

@Component({
  selector: 'ngx-list-produccion-academica',
  templateUrl: './list-produccion_academica.component.html',
  styleUrls: ['./list-produccion_academica.component.scss'],
})
export class ListProduccionAcademicaComponent implements OnInit {
  prod_selected: ProduccionAcademicaPost;
  cambiotab: boolean = false;
  config: ToasterConfig;
  ente: number;
  settings: any;

  @Input('ente_id')
  set name(ente_id: number) {
    if (ente_id !== undefined && ente_id !== null && ente_id.toString() !== '') {
      this.ente = ente_id;
      this.loadData();
    }
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  loading: boolean;
  percentage: number;
  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService,
    private campusMidService: CampusMidService,
    // private user: UserService,
    private toasterService: ToasterService) {
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
  }

  cargarCampos() {
    this.settings = {
      actions: {
        columnTitle: '',
        add: true,
        edit: true,
        delete: true,
      },
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
        Titulo: {
          title: this.translate.instant('GLOBAL.titulo_produccion_academica'),
          width: '55%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        SubtipoProduccionId: {
          title: this.translate.instant('GLOBAL.tipo_produccion_academica'),
          width: '15%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Autores: {
          title: this.translate.instant('GLOBAL.estado_autor'),
          width: '15%',
          valuePrepareFunction: (value) => {
            return value[0].EstadoAutorProduccionId.Nombre;
          },
        },
        Fecha: {
          title: this.translate.instant('GLOBAL.fecha_publicacion'),
          width: '15%',
          valuePrepareFunction: (value) => {
            return formatDate(value, 'yyyy-MM-dd', 'en');
            // return ((value) + '').substring(0, 10);
          },
        },
      },
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.campusMidService.get('produccion_academica/' + this.ente)
      .subscribe((res: any) => {
        if (res !== null) {
          if (Object.keys(res[0]).length > 0 && res.Type !== 'error') {
            const data = <Array<ProduccionAcademicaPost>>res;
            this.getPercentage(1);
            this.source.load(data);
          }
        }
      },
        (error: HttpErrorResponse) => {
          if (error.status.toString() !== '200') {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.produccion_academica'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          }
        });
  }

  ngOnInit() {
  }

  getPercentage(event) {
    this.percentage = event;
    this.result.emit(this.percentage);
  }

  onEdit(event): void {
    if (event.data.Autores[0].EstadoAutorProduccionId.Id === 1 || event.data.Autores[0].EstadoAutorProduccionId.Id === 2) {
      this.prod_selected = event.data;
      this.activetab();
    } else if (event.data.EstadoEnteAutorId.EstadoAutorProduccionId.Id === 3) {
      this.updateEstadoAutor(event.data);
    } else {
      this.showToast('error', 'Error', this.translate.instant('GLOBAL.accion_no_permitida'));
    }
  }

  onCreate(event): void {
    this.prod_selected = undefined;
    this.activetab();
  }

  onDelete(event): void {
    if (event.data.Autores[0].EstadoAutorProduccionId.Id === 1) {
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
            this.campusMidService.delete('produccion_academica', event.data).subscribe((res: any) => {
              if (res !== null) {
                  this.source.load([]);
                  this.loadData();
                  this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
                    this.translate.instant('GLOBAL.produccion_academica') + ' ' +
                    this.translate.instant('GLOBAL.confirmarEliminar'));
              }
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.eliminar') + '-' +
                    this.translate.instant('GLOBAL.produccion_academica'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
          }
        });
    } else if (event.data.EstadoEnteAutorId.EstadoAutorProduccionId.Id === 2) {
      const opt: any = {
        title: 'Error',
        text: this.translate.instant('GLOBAL.autor_no_puede_borrar'),
        icon: 'warning',
        buttons: false,
      };
      Swal(opt);
    } else if (event.data.EstadoEnteAutorId.EstadoAutorProduccionId.Id === 3) {
      this.updateEstadoAutor(event.data);
    } else {
      this.showToast('error', 'Error', this.translate.instant('GLOBAL.accion_no_permitida'));
    }
  }

  updateEstadoAutor(data: any): void {
    const opt: any = {
      title: 'Error',
      text: this.translate.instant('GLOBAL.autor_no_ha_confirmado'),
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willConfirm) => {
      if (willConfirm.value) {
        const optConfirmar: any = {
          title: this.translate.instant('GLOBAL.confirmar'),
          text: this.translate.instant('GLOBAL.confirma_participar_produccion'),
          icon: 'warning',
          buttons: true,
          dangerMode: true,
          showCancelButton: true,
          confirmButtonText: this.translate.instant('GLOBAL.si'),
          cancelButtonText: this.translate.instant('GLOBAL.no'),
        };
         Swal(optConfirmar)
        .then((isAuthor) => {
          const dataPut = {
            acepta: isAuthor.value ? true : false,
            AutorProduccionAcademica: data.EstadoEnteAutorId,
          }
          this.campusMidService.put('produccion_academica/estado_autor_produccion/' + dataPut.AutorProduccionAcademica.Id, dataPut)
          .subscribe((res: any) => {
            if (res.Type === 'error') {
              Swal({
                type: 'error',
                title: res.Code,
                text: this.translate.instant('ERROR.' + res.Code),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
              this.showToast('error', 'Error', this.translate.instant('GLOBAL.estado_autor_no_actualizado'));
            } else {
              this.loadData();
              this.showToast('success', this.translate.instant('GLOBAL.actualizar'), this.translate.instant('GLOBAL.estado_autor_actualizado'));
            }
          }, (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
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
