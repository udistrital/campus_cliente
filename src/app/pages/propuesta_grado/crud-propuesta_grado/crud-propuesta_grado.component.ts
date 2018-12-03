
import { PropuestaGrado } from './../../../@core/data/models/propuesta_grado';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropuestaService } from '../../../@core/data/propuesta.service';
import { FORM_PROPUESTA_GRADO } from './form-propuesta_grado';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { IAppState } from '../../../@core/store/app.state';
import { Store } from '@ngrx/store';
import { ListService } from '../../../@core/store/services/list.service';

@Component({
  selector: 'ngx-crud-propuesta-grado',
  templateUrl: './crud-propuesta_grado.component.html',
  styleUrls: ['./crud-propuesta_grado.component.scss'],
})
export class CrudPropuestaGradoComponent implements OnInit {
  config: ToasterConfig;
  propuesta_grado_id: number;

  @Input('propuesta_grado_id')
  set name(propuesta_grado_id: number) {
    this.propuesta_grado_id = propuesta_grado_id;
    this.loadPropuestaGrado();
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_propuesta_grado: PropuestaGrado;
  formPropuestaGrado: any;
  regPropuestaGrado: any;
  clean: boolean;
  loading: boolean;
  percentage: number;

  constructor(
    private translate: TranslateService,
    private propuestaService: PropuestaService,
    private store: Store < IAppState > ,
    private listService: ListService,
    private toasterService: ToasterService) {
    this.formPropuestaGrado = FORM_PROPUESTA_GRADO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.listService.findCiudad();
    this.listService.findLineaInvestigacion();
    this.loading = false;
    this.loadLists();
   }

  construirForm() {
    this.formPropuestaGrado.titulo = this.translate.instant('GLOBAL.propuesta_grado');
    this.formPropuestaGrado.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formPropuestaGrado.campos.length; i++) {
      this.formPropuestaGrado.campos[i].label = this.translate.instant('GLOBAL.' + this.formPropuestaGrado.campos[i].label_i18n);
      this.formPropuestaGrado.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formPropuestaGrado.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formPropuestaGrado.campos.length; index++) {
      const element = this.formPropuestaGrado.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadPropuestaGrado(): void {
    if (this.propuesta_grado_id !== undefined && this.propuesta_grado_id !== 0) {
      this.propuestaService.get('propuesta_grado/?query=id:' + this.propuesta_grado_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_propuesta_grado = <PropuestaGrado>res[0];
          }
        });
    } else  {
      this.info_propuesta_grado = undefined;
      this.clean = !this.clean;
    }
  }

  updatePropuestaGrado(propuestaGrado: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update PropuestaGrado!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_propuesta_grado = <PropuestaGrado>propuestaGrado;
        this.propuestaService.put('propuesta_grado', this.info_propuesta_grado)
          .subscribe(res => {
            this.loadPropuestaGrado();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'PropuestaGrado updated');
          });
      }
    });
  }

  createPropuestaGrado(propuestaGrado: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create PropuestaGrado!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_propuesta_grado = <PropuestaGrado>propuestaGrado;
        this.propuestaService.post('propuesta_grado', this.info_propuesta_grado)
          .subscribe(res => {
            this.info_propuesta_grado = <PropuestaGrado>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'PropuestaGrado created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadPropuestaGrado();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_propuesta_grado === undefined) {
        this.createPropuestaGrado(event.data.PropuestaGrado);
      } else {
        this.updatePropuestaGrado(event.data.PropuestaGrado);
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

  public loadLists() {
    this.store.select((state) => state).subscribe(
      (list) => {
        this.formPropuestaGrado.campos[this.getIndexForm('Lugarejecucion')].opciones = list.listCiudad[0];
        this.formPropuestaGrado.campos[this.getIndexForm('Lineainvestigacion')].opciones = list.listLineaInvestigacion[0];
      },
    );
  }

}
