
import { TipoProyecto } from './../../../@core/data/models/tipo_proyecto';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdmisionesService } from '../../../@core/data/admisiones.service';
import { FORM_TIPO_PROYECTO } from './form-tipo_proyecto';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-proyecto',
  templateUrl: './crud-tipo_proyecto.component.html',
  styleUrls: ['./crud-tipo_proyecto.component.scss'],
})
export class CrudTipoProyectoComponent implements OnInit {
  config: ToasterConfig;
  tipo_proyecto_id: number;

  @Input('tipo_proyecto_id')
  set name(tipo_proyecto_id: number) {
    this.tipo_proyecto_id = tipo_proyecto_id;
    this.loadTipoProyecto();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_proyecto: TipoProyecto;
  formTipoProyecto: any;
  regTipoProyecto: any;
  clean: boolean;

  constructor(private translate: TranslateService, private admisionesService: AdmisionesService, private toasterService: ToasterService) {
    this.formTipoProyecto = FORM_TIPO_PROYECTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
   }

  construirForm() {
    this.formTipoProyecto.titulo = this.translate.instant('GLOBAL.tipo_proyecto');
    this.formTipoProyecto.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoProyecto.campos.length; i++) {
      this.formTipoProyecto.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoProyecto.campos[i].label_i18n);
      this.formTipoProyecto.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoProyecto.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoProyecto.campos.length; index++) {
      const element = this.formTipoProyecto.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadTipoProyecto(): void {
    if (this.tipo_proyecto_id !== undefined && this.tipo_proyecto_id !== 0) {
      this.admisionesService.get('tipo_proyecto/?query=id:' + this.tipo_proyecto_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_tipo_proyecto = <TipoProyecto>res[0];
          }
        });
    } else  {
      this.info_tipo_proyecto = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoProyecto(tipoProyecto: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update TipoProyecto!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_tipo_proyecto = <TipoProyecto>tipoProyecto;
        this.admisionesService.put('tipo_proyecto', this.info_tipo_proyecto, this.info_tipo_proyecto.Id)
          .subscribe(res => {
            this.loadTipoProyecto();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'TipoProyecto updated');
          });
      }
    });
  }

  createTipoProyecto(tipoProyecto: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create TipoProyecto!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_tipo_proyecto = <TipoProyecto>tipoProyecto;
        this.admisionesService.post('tipo_proyecto', this.info_tipo_proyecto)
          .subscribe(res => {
            this.info_tipo_proyecto = <TipoProyecto>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'TipoProyecto created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadTipoProyecto();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_proyecto === undefined) {
        this.createTipoProyecto(event.data.TipoProyecto);
      } else {
        this.updateTipoProyecto(event.data.TipoProyecto);
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
