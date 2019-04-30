import { TipoPublicacionLibro } from './../../../@core/data/models/tipo_publicacion_libro';
import { MedioDivulgacion } from './../../../@core/data/models/medio_divulgacion';
import { MedioPublicacion } from './../../../@core/data/models/medio_publicacion';
import { UbicacionesService } from '../../../@core/data/ubicaciones.service'
import { Libro } from './../../../@core/data/models/libro';
import { Lugar } from './../../../@core/data/models/lugar';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { FORM_LIBRO } from './form-libro';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserService } from '../../../@core/data/users.service';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-libro',
  templateUrl: './crud-libro.component.html',
  styleUrls: ['./crud-libro.component.scss'],
})
export class CrudLibroComponent implements OnInit {
  config: ToasterConfig;
  libro_id: number;
  ente: number;

  @Input('libro_id')
  set name(libro_id: number) {
    this.libro_id = libro_id;
    this.loadLibro();
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_libro: Libro;
  formLibro: any;
  regLibro: any;
  clean: boolean;
  loading: boolean;
  percentage: number;
  aspirante: number;
  activarTituloCapitulo: boolean;

  constructor(
    private translate: TranslateService,
    private produccionAcademicaService: ProduccionAcademicaService,
    private user: UserService,
    private ubicacionesService: UbicacionesService,
    private toasterService: ToasterService) {
    this.formLibro = FORM_LIBRO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipopublicacion();
    this.loadOptionsMediodivulgacion();
    this.loadOptionsMediopublicacion();
    this.loadOptionsCiudadPublicacion();
    this.ente = this.user.getEnte();
    this.activarTituloCapitulo = false;
  }

  construirForm() {
    this.formLibro.titulo = this.translate.instant('GLOBAL.libro');
    this.formLibro.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formLibro.campos.length; i++) {
      this.formLibro.campos[i].label = this.translate.instant('GLOBAL.' + this.formLibro.campos[i].label_i18n);
      this.formLibro.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formLibro.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formLibro.campos.length; index++) {
      const element = this.formLibro.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  loadOptionsTipopublicacion(): void {
    let tipopublicacion: Array<any> = [];
    this.produccionAcademicaService.get('tipo_publicacion_libro/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          tipopublicacion = <Array<TipoPublicacionLibro>>res;
        }
        this.formLibro.campos[this.getIndexForm('TipoPublicacion')].opciones = tipopublicacion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.libro') + '|' +
              this.translate.instant('GLOBAL.tipo_publicacion'),
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
        this.formLibro.campos[this.getIndexForm('MedioDivulgacion')].opciones = mediodivulgacion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.libro') + '|' +
              this.translate.instant('GLOBAL.medio_divulgacion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsMediopublicacion(): void {
    let mediopublicacion: Array<any> = [];
    this.produccionAcademicaService.get('medio_publicacion/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          mediopublicacion = <Array<MedioPublicacion>>res;
        }
        this.formLibro.campos[this.getIndexForm('MedioPublicacion')].opciones = mediopublicacion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.libro') + '|' +
              this.translate.instant('GLOBAL.medio_publicacion'),
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
        this.formLibro.campos[this.getIndexForm('Ubicacion')].opciones = ciudadPublicacion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.libro') + '|' +
              this.translate.instant('GLOBAL.ubicacion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  public loadLibro(): void {
    this.loading = true;
    if (this.libro_id !== undefined && this.libro_id !== 0 && this.libro_id.toString() !== '') {
      this.produccionAcademicaService.get('libro/?query=id:' + this.libro_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_libro = <Libro>res[0];
            this.loading = false;
            console.info('Ciudadela: ' + this.info_libro.Ubicacion);
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.libro'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_libro = undefined;
      this.clean = !this.clean;
      this.loading = false;
    }
  }

  updateLibro(libro: any): void {
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
          this.info_libro = <Libro>libro;
          this.produccionAcademicaService.put('libro', this.info_libro)
            .subscribe(res => {
              this.loading = false;
              this.eventChange.emit(true);
              this.loadLibro();
              this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                this.translate.instant('GLOBAL.libro') + ' ' +
                this.translate.instant('GLOBAL.confirmarActualizar'));
              this.libro_id = 0;
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                    this.translate.instant('GLOBAL.libro'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  createLibro(libro: any): void {
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
          this.info_libro = <Libro>libro;
          this.info_libro.Persona = this.ente;
          this.produccionAcademicaService.post('libro', this.info_libro)
            .subscribe(res => {
              const r = <any>res;
              if (r !== null && r.Type !== 'error') {
                this.info_libro = <Libro>res;
                this.loading = false;
                this.eventChange.emit(true);
                this.showToast('info', this.translate.instant('GLOBAL.crear'),
                  this.translate.instant('GLOBAL.libro') + ' ' +
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
                    this.translate.instant('GLOBAL.libro'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  ngOnInit() {
    this.loadLibro();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_libro === undefined) {
        this.createLibro(event.data.Libro);
      } else {
        this.updateLibro(event.data.Libro);
      }
    }
  }

  activarCapitulo(event) {
    if (event.valid) {
      !this.activarTituloCapitulo;
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
