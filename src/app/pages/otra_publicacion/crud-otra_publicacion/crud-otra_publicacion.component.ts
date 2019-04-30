import { TipoOtraPublicacion } from './../../../@core/data/models/tipo_otra_publicacion';
import { UserService } from '../../../@core/data/users.service';
import { OtraPublicacion } from './../../../@core/data/models/otra_publicacion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { FORM_OTRA_PUBLICACION } from './form-otra_publicacion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-otra-publicacion',
  templateUrl: './crud-otra_publicacion.component.html',
  styleUrls: ['./crud-otra_publicacion.component.scss'],
})
export class CrudOtraPublicacionComponent implements OnInit {
  config: ToasterConfig;
  otra_publicacion_id: number;

  @Input('otra_publicacion_id')
  set name(otra_publicacion_id: number) {
    this.otra_publicacion_id = otra_publicacion_id;
    this.loadOtraPublicacion();
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_otra_publicacion: OtraPublicacion;
  formOtraPublicacion: any;
  regOtraPublicacion: any;
  clean: boolean;
  loading: boolean;
  percentage: number;

  constructor(private translate: TranslateService,
    private users: UserService,
    private produccionAcademicaService: ProduccionAcademicaService,
    private toasterService: ToasterService) {
    this.formOtraPublicacion = FORM_OTRA_PUBLICACION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipo();
  }

  construirForm() {
    this.formOtraPublicacion.titulo = this.translate.instant('GLOBAL.otra_publicacion');
    this.formOtraPublicacion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formOtraPublicacion.campos.length; i++) {
      this.formOtraPublicacion.campos[i].label = this.translate.instant('GLOBAL.' + this.formOtraPublicacion.campos[i].label_i18n);
      this.formOtraPublicacion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formOtraPublicacion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsTipo(): void {
    let tipo: Array<any> = [];
    this.produccionAcademicaService.get('tipo_otra_publicacion/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          tipo = <Array<TipoOtraPublicacion>>res;
        }
        this.formOtraPublicacion.campos[this.getIndexForm('Tipo')].opciones = tipo;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.otra_publicacion') + '|' +
              this.translate.instant('GLOBAL.tipo_otra_publicacion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formOtraPublicacion.campos.length; index++) {
      const element = this.formOtraPublicacion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadOtraPublicacion(): void {
    if (this.otra_publicacion_id !== undefined && this.otra_publicacion_id !== 0) {
      this.produccionAcademicaService.get('otra_publicacion/?query=id:' + this.otra_publicacion_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_otra_publicacion = <OtraPublicacion>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.otra_publicacion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_otra_publicacion = undefined;
      this.clean = !this.clean;
      this.loading = false;
    }
  }

  updateOtraPublicacion(otraPublicacion: any): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.actualizar'),
      text: this.translate.instant('GLOBAL.actualizar') + '?',
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
          this.loading = true;
          this.info_otra_publicacion = <OtraPublicacion>otraPublicacion;
          this.produccionAcademicaService.put('otra_publicacion', this.info_otra_publicacion)
            .subscribe(res => {
              this.loading = false;
              this.eventChange.emit(true);
              this.loadOtraPublicacion();
              this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                this.translate.instant('GLOBAL.publicacion') + ' ' +
                this.translate.instant('GLOBAL.confirmarActualizar'));
              this.otra_publicacion_id = 0;
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                    this.translate.instant('GLOBAL.otra_publicacion'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  createOtraPublicacion(otraPublicacion: any): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.crear'),
      text: this.translate.instant('GLOBAL.crear') + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    };
    Swal(opt)
      .then((willDelete) => {
        this.loading = true;
        if (willDelete.value) {
          this.info_otra_publicacion = <OtraPublicacion>otraPublicacion;
          this.info_otra_publicacion.Persona = this.users.getEnte();
          this.produccionAcademicaService.post('otra_publicacion', this.info_otra_publicacion)
            .subscribe(res => {
              const r = <any>res;
              if (r !== null && r.Type !== 'error') {
                this.info_otra_publicacion = <OtraPublicacion>res;
                this.loading = false;
                this.eventChange.emit(true);
                this.showToast('info', this.translate.instant('GLOBAL.crear'),
                  this.translate.instant('GLOBAL.publicacion') + ' ' +
                  this.translate.instant('GLOBAL.confirmarCrear'));
                this.clean = !this.clean;
              } else {
                this.showToast('error', this.translate.instant('GLOBAL.error'),
                  this.translate.instant('GLOBAL.error'));
              }
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.crear') + '-' +
                    this.translate.instant('GLOBAL.otra_publicacion'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  ngOnInit() {
    this.loadOtraPublicacion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_otra_publicacion === undefined) {
        this.createOtraPublicacion(event.data.OtraPublicacion);
      } else {
        this.updateOtraPublicacion(event.data.OtraPublicacion);
      }
    }
  }

  setPercentage(event) {
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
