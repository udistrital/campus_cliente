
import { OtroDocumento } from './../../../@core/data/models/otro_documento';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { UserService } from '../../../@core/data/users.service';
import { FORM_OTRO_DOCUMENTO } from './form-otro_documento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

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

  info_otro_documento: OtroDocumento;
  formOtroDocumento: any;
  regOtroDocumento: any;
  clean: boolean;

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
        });
    } else  {
      this.info_otro_documento = undefined;
      this.clean = !this.clean;
    }
  }

  updateOtroDocumento(otroDocumento: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update OtroDocumento!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_otro_documento = <OtroDocumento>otroDocumento;
        this.produccionAcademicaService.put('otro_documento', this.info_otro_documento)
          .subscribe(res => {
            this.loadOtroDocumento();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'OtroDocumento updated');
          });
      }
    });
  }

  createOtroDocumento(otroDocumento: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create OtroDocumento!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_otro_documento = <OtroDocumento>otroDocumento;
        this.info_otro_documento.Persona = this.users.getEnte();
        this.produccionAcademicaService.post('otro_documento', this.info_otro_documento)
          .subscribe(res => {
            this.info_otro_documento = <OtroDocumento>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'OtroDocumento created');
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
