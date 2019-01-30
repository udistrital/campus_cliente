import { TipoDisciplina } from './../../../@core/data/models/tipo_disciplina';
import { UserService } from '../../../@core/data/users.service';
import { ProduccionArtesArquDiseno } from './../../../@core/data/models/produccion_artes_arqu_diseno';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { FORM_PRODUCCION_ARTES_ARQU_DISENO } from './form-produccion_artes_arqu_diseno';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
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

  info_produccion_artes_arqu_diseno: ProduccionArtesArquDiseno;
  formProduccionArtesArquDiseno: any;
  regProduccionArtesArquDiseno: any;
  clean: boolean;

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
          this.formProduccionArtesArquDiseno.campos[ this.getIndexForm('TipoDisciplina') ].opciones = tipodisciplina;
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
    if (this.produccion_artes_arqu_diseno_id !== undefined && this.produccion_artes_arqu_diseno_id !== 0) {
      this.produccionAcademicaService.get('produccion_artes_arqu_diseno/?query=id:' + this.produccion_artes_arqu_diseno_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_produccion_artes_arqu_diseno = <ProduccionArtesArquDiseno>res[0];
          }
        });
    } else  {
      this.info_produccion_artes_arqu_diseno = undefined;
      this.clean = !this.clean;
    }
  }

  updateProduccionArtesArquDiseno(produccionArtesArquDiseno: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update ProduccionArtesArquDiseno!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_produccion_artes_arqu_diseno = <ProduccionArtesArquDiseno>produccionArtesArquDiseno;
        this.produccionAcademicaService.put('produccion_artes_arqu_diseno', this.info_produccion_artes_arqu_diseno)
          .subscribe(res => {
            this.loadProduccionArtesArquDiseno();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'ProduccionArtesArquDiseno updated');
          });
      }
    });
  }

  createProduccionArtesArquDiseno(produccionArtesArquDiseno: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create ProduccionArtesArquDiseno!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_produccion_artes_arqu_diseno = <ProduccionArtesArquDiseno>produccionArtesArquDiseno;
        this.info_produccion_artes_arqu_diseno.Persona = this.user.getEnte();
        this.produccionAcademicaService.post('produccion_artes_arqu_diseno', this.info_produccion_artes_arqu_diseno)
          .subscribe(res => {
            this.info_produccion_artes_arqu_diseno = <ProduccionArtesArquDiseno>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'ProduccionArtesArquDiseno created');
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
