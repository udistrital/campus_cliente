import { TipoTraduccion } from './../../../@core/data/models/tipo_traduccion';
import { MedioDivulgacion } from './../../../@core/data/models/medio_divulgacion';
import { Idioma } from './../../../@core/data/models/idioma';
import { UserService } from '../../../@core/data/users.service';
import { IdiomaService } from '../../../@core/data/idioma.service';
import { Traduccion } from './../../../@core/data/models/traduccion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { FORM_TRADUCCION } from './form-traduccion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-traduccion',
  templateUrl: './crud-traduccion.component.html',
  styleUrls: ['./crud-traduccion.component.scss'],
})
export class CrudTraduccionComponent implements OnInit {
  config: ToasterConfig;
  traduccion_id: number;

  @Input('traduccion_id')
  set name(traduccion_id: number) {
    this.traduccion_id = traduccion_id;
    this.loadTraduccion();
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_traduccion: Traduccion;
  formTraduccion: any;
  regTraduccion: any;
  clean: boolean;
  loading: boolean;
  percentage: number;

  constructor(
    private translate: TranslateService,
    private users: UserService,
    private idiomaService: IdiomaService,
    private produccionAcademicaService: ProduccionAcademicaService,
    private toasterService: ToasterService) {
    this.formTraduccion = FORM_TRADUCCION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipotraduccion();
    this.loadOptionsMediodivulgacion();
    this.loadOptionsIdiomas();
  }

  construirForm() {
    this.formTraduccion.titulo = this.translate.instant('GLOBAL.traduccion');
    this.formTraduccion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTraduccion.campos.length; i++) {
      this.formTraduccion.campos[i].label = this.translate.instant('GLOBAL.' + this.formTraduccion.campos[i].label_i18n);
      this.formTraduccion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTraduccion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsTipotraduccion(): void {
    let tipotraduccion: Array<any> = [];
    this.produccionAcademicaService.get('tipo_traduccion/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          tipotraduccion = <Array<TipoTraduccion>>res;
        }
        this.formTraduccion.campos[this.getIndexForm('Tipotraduccion')].opciones = tipotraduccion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.libro') + '|' +
              this.translate.instant('GLOBAL.tipo_traduccion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsMediodivulgacion(): void {
    let mediodivulgacion: Array<any> = [];
    this.produccionAcademicaService.get('medio_divulgacion/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          mediodivulgacion = <Array<MedioDivulgacion>>res;
        }
        this.formTraduccion.campos[this.getIndexForm('MedioDivulgacion')].opciones = mediodivulgacion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.traduccion') + '|' +
              this.translate.instant('GLOBAL.medio_divulgacion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsIdiomas(): void {
    let idioma: Array<any> = [];
    this.idiomaService.get('idioma/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          idioma = <Array<Idioma>>res;
        }
        this.formTraduccion.campos[this.getIndexForm('IdiomaOriginal')].opciones = idioma;
        this.formTraduccion.campos[this.getIndexForm('IdiomaTraducido')].opciones = idioma;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.traduccion') + '|' +
              this.translate.instant('GLOBAL.idiomas'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTraduccion.campos.length; index++) {
      const element = this.formTraduccion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTraduccion(): void {
    this.loading = true;
    if (this.traduccion_id !== undefined && this.traduccion_id !== 0 &&
      this.traduccion_id.toString() !== '') {
      this.produccionAcademicaService.get('traduccion/?query=id:' + this.traduccion_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_traduccion = <Traduccion>res[0];
            this.loading = false;
          }
        });
    } else {
      this.info_traduccion = undefined;
      this.clean = !this.clean;
    }
  }

  updateTraduccion(traduccion: any): void {
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
          this.info_traduccion = <Traduccion>traduccion;
          this.produccionAcademicaService.put('traduccion', this.info_traduccion)
            .subscribe(res => {
              this.loading = false;
              this.eventChange.emit(true);
              this.loadTraduccion();
              this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                this.translate.instant('GLOBAL.traduccion') + ' ' +
                this.translate.instant('GLOBAL.confirmarActualizar'));
              this.traduccion_id = 0;
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                    this.translate.instant('GLOBAL.traduccion'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  createTraduccion(traduccion: any): void {
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
          this.info_traduccion = <Traduccion>traduccion;
          this.info_traduccion.Persona = this.users.getEnte();
          this.produccionAcademicaService.post('traduccion', this.info_traduccion)
            .subscribe(res => {
              const r = <any>res;
              if (r !== null && r.Type !== 'error') {
                this.info_traduccion = <Traduccion>res;
                this.loading = false;
                this.eventChange.emit(true);
                this.showToast('info', this.translate.instant('GLOBAL.crear'),
                  this.translate.instant('GLOBAL.traduccion') + ' ' +
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
                    this.translate.instant('GLOBAL.traduccion'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  ngOnInit() {
    this.loadTraduccion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_traduccion === undefined) {
        this.createTraduccion(event.data.Traduccion);
      } else {
        this.updateTraduccion(event.data.Traduccion);
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
