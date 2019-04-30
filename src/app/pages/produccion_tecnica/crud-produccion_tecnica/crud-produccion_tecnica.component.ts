import { TipoProduccionTecnica } from './../../../@core/data/models/tipo_produccion_tecnica';
import { UserService } from '../../../@core/data/users.service';
import { UbicacionesService } from '../../../@core/data/ubicaciones.service'
import { ProduccionTecnica } from './../../../@core/data/models/produccion_tecnica';
import { Lugar } from './../../../@core/data/models/lugar';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { FORM_PRODUCCION_TECNICA } from './form-produccion_tecnica';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-produccion-tecnica',
  templateUrl: './crud-produccion_tecnica.component.html',
  styleUrls: ['./crud-produccion_tecnica.component.scss'],
})
export class CrudProduccionTecnicaComponent implements OnInit {
  config: ToasterConfig;
  produccion_tecnica_id: number;

  @Input('produccion_tecnica_id')
  set name(produccion_tecnica_id: number) {
    this.produccion_tecnica_id = produccion_tecnica_id;
    this.loadProduccionTecnica();
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_produccion_tecnica: ProduccionTecnica;
  formProduccionTecnica: any;
  regProduccionTecnica: any;
  clean: boolean;
  loading: boolean;
  percentage: number;

  constructor(private translate: TranslateService,
    private produccionAcademicaService: ProduccionAcademicaService,
    private user: UserService,
    private ubicacionesService: UbicacionesService,
    private toasterService: ToasterService) {
    this.formProduccionTecnica = FORM_PRODUCCION_TECNICA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipoproducciontecnica();
    this.loadOptionsCiudadPublicacion();
  }

  construirForm() {
    this.formProduccionTecnica.titulo = this.translate.instant('GLOBAL.produccion_tecnica');
    this.formProduccionTecnica.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formProduccionTecnica.campos.length; i++) {
      this.formProduccionTecnica.campos[i].label = this.translate.instant('GLOBAL.' + this.formProduccionTecnica.campos[i].label_i18n);
      this.formProduccionTecnica.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formProduccionTecnica.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsTipoproducciontecnica(): void {
    let tipoproducciontecnica: Array<any> = [];
    this.produccionAcademicaService.get('tipo_produccion_tecnica/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          tipoproducciontecnica = <Array<TipoProduccionTecnica>>res;
        }
        this.formProduccionTecnica.campos[this.getIndexForm('Tipoproducciontecnica')].opciones = tipoproducciontecnica;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.produccion_tecnica') + '|' +
              this.translate.instant('GLOBAL.tipo_produccion_tecnica'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsCiudadPublicacion(): void {
    let ciudadPublicacion: Array<any> = [];
    this.ubicacionesService.get('lugar/?query=TipoLugar.Id:2')
      .subscribe(res => {
        if (res !== null) {
          ciudadPublicacion = <Array<Lugar>>res;
        }
        this.formProduccionTecnica.campos[this.getIndexForm('Ubicacion')].opciones = ciudadPublicacion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.produccion_tecnica') + '|' +
              this.translate.instant('GLOBAL.ubicacion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formProduccionTecnica.campos.length; index++) {
      const element = this.formProduccionTecnica.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadProduccionTecnica(): void {
    if (this.produccion_tecnica_id !== undefined && this.produccion_tecnica_id !== 0) {
      this.produccionAcademicaService.get('produccion_tecnica/?query=id:' + this.produccion_tecnica_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_produccion_tecnica = <ProduccionTecnica>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.produccion_tecnica'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_produccion_tecnica = undefined;
      this.clean = !this.clean;
      this.loading = false;
    }
  }

  updateProduccionTecnica(produccionTecnica: any): void {
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
          this.info_produccion_tecnica = <ProduccionTecnica>produccionTecnica;
          this.produccionAcademicaService.put('produccion_tecnica', this.info_produccion_tecnica)
            .subscribe(res => {
              this.loading = false;
              this.eventChange.emit(true);
              this.loadProduccionTecnica();
              this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                this.translate.instant('GLOBAL.produccion_tecnica') + ' ' +
                this.translate.instant('GLOBAL.confirmarActualizar'));
              this.produccion_tecnica_id = 0;
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                    this.translate.instant('GLOBAL.produccion_tecnica'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  createProduccionTecnica(produccionTecnica: any): void {
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
          this.info_produccion_tecnica = <ProduccionTecnica>produccionTecnica;
          this.info_produccion_tecnica.Persona = this.user.getEnte();
          this.produccionAcademicaService.post('produccion_tecnica', this.info_produccion_tecnica)
            .subscribe(res => {
              const r = <any>res;
              if (r !== null && r.Type !== 'error') {
                this.info_produccion_tecnica = <ProduccionTecnica>res;
                this.loading = false;
                this.eventChange.emit(true);
                this.showToast('info', this.translate.instant('GLOBAL.crear'),
                  this.translate.instant('GLOBAL.produccion_tecnica') + ' ' +
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
                    this.translate.instant('GLOBAL.produccion_tecnica'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  ngOnInit() {
    this.loadProduccionTecnica();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_produccion_tecnica === undefined) {
        this.createProduccionTecnica(event.data.ProduccionTecnica);
      } else {
        this.updateProduccionTecnica(event.data.ProduccionTecnica);
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
