import { OtroDocumento } from './../../../@core/data/models/otro_documento';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { UserService } from '../../../@core/data/users.service';
import { FORM_OTRO_DOCUMENTO } from './form-otro_documento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-otro-documento',
  templateUrl: './crud-otro_documento.component.html',
  styleUrls: ['./crud-otro_documento.component.scss'],
})
export class CrudOtroDocumentoComponent implements OnInit {
  config: ToasterConfig;
  otro_documento_id: number;

  @Input('otro_documento_id')
  set name(otro_documento_id: number) {
    this.otro_documento_id = otro_documento_id;
    this.loadOtroDocumento();
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_otro_documento: OtroDocumento;
  formOtroDocumento: any;
  regOtroDocumento: any;
  clean: boolean;
  loading: boolean;
  percentage: number;

  constructor(private translate: TranslateService,
    private produccionAcademicaService: ProduccionAcademicaService,
    private users: UserService,
    private toasterService: ToasterService) {
    this.formOtroDocumento = FORM_OTRO_DOCUMENTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formOtroDocumento.titulo = this.translate.instant('GLOBAL.otro_documento');
    this.formOtroDocumento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formOtroDocumento.campos.length; i++) {
      this.formOtroDocumento.campos[i].label = this.translate.instant('GLOBAL.' + this.formOtroDocumento.campos[i].label_i18n);
      this.formOtroDocumento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formOtroDocumento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formOtroDocumento.campos.length; index++) {
      const element = this.formOtroDocumento.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadOtroDocumento(): void {
    if (this.otro_documento_id !== undefined && this.otro_documento_id !== 0) {
      this.produccionAcademicaService.get('otro_documento/?query=id:' + this.otro_documento_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_otro_documento = <OtroDocumento>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.otro_documento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_otro_documento = undefined;
      this.clean = !this.clean;
      this.loading = false;
    }
  }

  updateOtroDocumento(otroDocumento: any): void {
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
          this.info_otro_documento = <OtroDocumento>otroDocumento;
          this.produccionAcademicaService.put('otro_documento', this.info_otro_documento)
            .subscribe(res => {
              this.loading = false;
              this.eventChange.emit(true);
              this.loadOtroDocumento();
              this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                this.translate.instant('GLOBAL.documento') + ' ' +
                this.translate.instant('GLOBAL.confirmarActualizar'));
              this.otro_documento_id = 0;
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                    this.translate.instant('GLOBAL.otro_documento'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  createOtroDocumento(otroDocumento: any): void {
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
          this.info_otro_documento = <OtroDocumento>otroDocumento;
          this.info_otro_documento.Persona = this.users.getEnte();
          this.produccionAcademicaService.post('otro_documento', this.info_otro_documento)
            .subscribe(res => {
              const r = <any>res;
              if (r !== null && r.Type !== 'error') {
                this.info_otro_documento = <OtroDocumento>res;
                this.loading = false;
                this.eventChange.emit(true);
                this.showToast('info', this.translate.instant('GLOBAL.crear'),
                  this.translate.instant('GLOBAL.documento') + ' ' +
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
                    this.translate.instant('GLOBAL.otro_documento'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  ngOnInit() {
    this.loadOtroDocumento();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_otro_documento === undefined) {
        this.createOtroDocumento(event.data.OtroDocumento);
      } else {
        this.updateOtroDocumento(event.data.OtroDocumento);
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
