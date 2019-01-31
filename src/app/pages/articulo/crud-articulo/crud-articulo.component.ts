import { TipoArticulo } from './../../../@core/data/models/tipo_articulo';
import { MedioDivulgacion } from './../../../@core/data/models/medio_divulgacion';

import { Articulo } from './../../../@core/data/models/articulo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { FORM_ARTICULO } from './form-articulo';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserService } from '../../../@core/data/users.service';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-articulo',
  templateUrl: './crud-articulo.component.html',
  styleUrls: ['./crud-articulo.component.scss'],
})
export class CrudArticuloComponent implements OnInit {
  config: ToasterConfig;
  articulo_id: number;
  ente_id: number;

  @Input('articulo_id')
  set name(articulo_id: number) {
    this.articulo_id = articulo_id;
    this.loadArticulo();
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_articulo: Articulo;
  formArticulo: any;
  regArticulo: any;
  clean: boolean;
  loading: boolean;
  percentage: number;

  constructor(
    private translate: TranslateService,
    private users: UserService,
    private produccionAcademicaService: ProduccionAcademicaService,
    private toasterService: ToasterService) {
    this.formArticulo = FORM_ARTICULO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipo();
    this.loadOptionsMediodivulgacion();
    this.ente_id = this.users.getEnte();
   }

  construirForm() {
    this.formArticulo.titulo = this.translate.instant('GLOBAL.articulo');
    this.formArticulo.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formArticulo.campos.length; i++) {
      this.formArticulo.campos[i].label = this.translate.instant('GLOBAL.' + this.formArticulo.campos[i].label_i18n);
      this.formArticulo.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formArticulo.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsTipo(): void {
    let tipo: Array<any> = [];
      this.produccionAcademicaService.get('tipo_articulo/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            tipo = <Array<TipoArticulo>>res;
          }
          this.formArticulo.campos[ this.getIndexForm('Tipo') ].opciones = tipo;
        },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
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
          this.formArticulo.campos[ this.getIndexForm('MedioDivulgacion') ].opciones = mediodivulgacion;
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formArticulo.campos.length; index++) {
      const element = this.formArticulo.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadArticulo(): void {
    if (this.articulo_id !== undefined && this.articulo_id !== 0) {
      this.produccionAcademicaService.get('articulo/?query=id:' + this.articulo_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_articulo = <Articulo>res[0];
          }
        });
    } else  {
      this.info_articulo = undefined;
      this.clean = !this.clean;
    }
  }

  updateArticulo(articulo: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update Articulo!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_articulo = <Articulo>articulo;
        this.produccionAcademicaService.put('articulo', this.info_articulo)
          .subscribe(res => {
            this.loadArticulo();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'Articulo updated');
          });
      }
    });
  }

  createArticulo(articulo: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create Articulo!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_articulo = <Articulo>articulo;
        this.info_articulo.Persona = this.users.getEnte();
        this.produccionAcademicaService.post('articulo', this.info_articulo)
          .subscribe(res => {
            this.info_articulo = <Articulo>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'Articulo created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadArticulo();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_articulo === undefined) {
        this.createArticulo(event.data.Articulo);
      } else {
        this.updateArticulo(event.data.Articulo);
      }
      this.result.emit(event);
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
