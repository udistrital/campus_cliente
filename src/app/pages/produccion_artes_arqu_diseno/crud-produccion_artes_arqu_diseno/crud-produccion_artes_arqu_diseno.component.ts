import { TipoDisciplina } from './../../../@core/data/models/tipo_disciplina';
import { UserService } from '../../../@core/data/users.service';
import { ProduccionArtesArquDiseno } from './../../../@core/data/models/produccion_artes_arqu_diseno';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { FORM_PRODUCCION_ARTES_ARQU_DISENO } from './form-produccion_artes_arqu_diseno';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-produccion-artes-arqu-diseno',
  templateUrl: './crud-produccion_artes_arqu_diseno.component.html',
  styleUrls: ['./crud-produccion_artes_arqu_diseno.component.scss'],
})
export class CrudProduccionArtesArquDisenoComponent implements OnInit {
  config: ToasterConfig;
  produccion_artes_arqu_diseno_id: number;

  @Input('produccion_artes_arqu_diseno_id')
  set name(produccion_artes_arqu_diseno_id: number) {
    this.produccion_artes_arqu_diseno_id = produccion_artes_arqu_diseno_id;
    this.loadProduccionArtesArquDiseno();
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_produccion_artes_arqu_diseno: ProduccionArtesArquDiseno;
  formProduccionArtesArquDiseno: any;
  regProduccionArtesArquDiseno: any;
  clean: boolean;
  loading: boolean;
  percentage: number;

  constructor(private translate: TranslateService,
    private produccionAcademicaService: ProduccionAcademicaService,
    private user: UserService,
    private toasterService: ToasterService) {
    this.formProduccionArtesArquDiseno = FORM_PRODUCCION_ARTES_ARQU_DISENO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipodisciplina();
  }

  construirForm() {
    this.formProduccionArtesArquDiseno.titulo = this.translate.instant('GLOBAL.produccion_artes_arqu_diseno');
    this.formProduccionArtesArquDiseno.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formProduccionArtesArquDiseno.campos.length; i++) {
      this.formProduccionArtesArquDiseno.campos[i].label = this.translate.instant('GLOBAL.' + this.formProduccionArtesArquDiseno.campos[i].label_i18n);
      this.formProduccionArtesArquDiseno.campos[i].placeholder = this.translate.
        instant('GLOBAL.placeholder_' + this.formProduccionArtesArquDiseno.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsTipodisciplina(): void {
    let tipodisciplina: Array<any> = [];
    this.produccionAcademicaService.get('tipo_disciplina/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          tipodisciplina = <Array<TipoDisciplina>>res;
        }
        this.formProduccionArtesArquDiseno.campos[this.getIndexForm('TipoDisciplina')].opciones = tipodisciplina;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.produccion_artes_arqu_diseno') + '|' +
              this.translate.instant('GLOBAL.tipo_disciplina'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formProduccionArtesArquDiseno.campos.length; index++) {
      const element = this.formProduccionArtesArquDiseno.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadProduccionArtesArquDiseno(): void {
    if (this.produccion_artes_arqu_diseno_id !== undefined && this.produccion_artes_arqu_diseno_id !== 0 &&
      this.produccion_artes_arqu_diseno_id.toString() !== '') {
      this.produccionAcademicaService.get('produccion_artes_arqu_diseno/?query=id:' + this.produccion_artes_arqu_diseno_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_produccion_artes_arqu_diseno = <ProduccionArtesArquDiseno>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.produccion_artes_arqu_diseno'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_produccion_artes_arqu_diseno = undefined;
      this.clean = !this.clean;
      this.loading = false;
    }
  }

  updateProduccionArtesArquDiseno(produccionArtesArquDiseno: any): void {
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
          this.info_produccion_artes_arqu_diseno = <ProduccionArtesArquDiseno>produccionArtesArquDiseno;
          this.produccionAcademicaService.put('produccion_artes_arqu_diseno', this.info_produccion_artes_arqu_diseno)
            .subscribe(res => {
              this.loading = false;
              this.eventChange.emit(true);
              this.loadProduccionArtesArquDiseno();
              this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                this.translate.instant('GLOBAL.produccion_artes_arqu_diseno') + ' ' +
                this.translate.instant('GLOBAL.confirmarActualizar'));
              this.produccion_artes_arqu_diseno_id = 0;
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                    this.translate.instant('GLOBAL.produccion_artes_arqu_diseno'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  createProduccionArtesArquDiseno(produccionArtesArquDiseno: any): void {
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
          this.info_produccion_artes_arqu_diseno = <ProduccionArtesArquDiseno>produccionArtesArquDiseno;
          this.info_produccion_artes_arqu_diseno.Persona = this.user.getEnte();
          this.produccionAcademicaService.post('produccion_artes_arqu_diseno', this.info_produccion_artes_arqu_diseno)
            .subscribe(res => {
              const r = <any>res;
              if (r !== null && r.Type !== 'error') {
                this.info_produccion_artes_arqu_diseno = <ProduccionArtesArquDiseno>res;
                this.loading = false;
                this.eventChange.emit(true);
                this.showToast('info', this.translate.instant('GLOBAL.crear'),
                  this.translate.instant('GLOBAL.produccion_artes_arqu_diseno') + ' ' +
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
                    this.translate.instant('GLOBAL.produccion_artes_arqu_diseno'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  ngOnInit() {
    this.loadProduccionArtesArquDiseno();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_produccion_artes_arqu_diseno === undefined) {
        this.createProduccionArtesArquDiseno(event.data.ProduccionArtesArquDiseno);
      } else {
        this.updateProduccionArtesArquDiseno(event.data.ProduccionArtesArquDiseno);
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
