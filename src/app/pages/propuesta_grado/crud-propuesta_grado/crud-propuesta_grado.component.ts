
import { PropuestaGrado } from './../../../@core/data/models/propuesta_grado';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdmisionesService } from '../../../@core/data/admisiones.service';
import { FORM_PROPUESTA_GRADO } from './form-propuesta_grado';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { IAppState } from '../../../@core/store/app.state';
import { Store } from '@ngrx/store';
import { ListService } from '../../../@core/store/services/list.service';
import { AdmisionService } from '../../../@core/data/admision.service';

@Component({
  selector: 'ngx-crud-propuesta-grado',
  templateUrl: './crud-propuesta_grado.component.html',
  styleUrls: ['./crud-propuesta_grado.component.scss'],
})
export class CrudPropuestaGradoComponent implements OnInit {
  config: ToasterConfig;
  propuesta_grado_id: number;
  admision_id: number;

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
    private admisionesService: AdmisionesService,
    private store: Store < IAppState > ,
    private listService: ListService,
    private Admi_id: AdmisionService,
    private toasterService: ToasterService) {
    this.formPropuestaGrado = FORM_PROPUESTA_GRADO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.listService.findGrupoInvestigacion();
    this.listService.findEnfasisProyecto();
    this.listService.findTipoProyecto();
    this.listService.findLineaInvestigacion();
    this.loading = false;
    this.loadLists();
    this.admision_id=this.Admi_id.getAdmision_id();
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
      this.admisionesService.get('propuesta/?query=id:' + this.propuesta_grado_id)
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
        this.admisionesService.put('propuesta', this.info_propuesta_grado)
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
        this.admisionesService.post('propuesta', this.info_propuesta_grado)
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
    console.log(event.data.PropuestaGrado);
    console.log(this.admision_id);
    const propuesta ={
      Nombre: event.data.PropuestaGrado.Nombre,
      Resumen: event.data.PropuestaGrado.Resumen,
      Grupoinvestigacion: event.data.PropuestaGrado.Grupoinvestigacion.Id,
      LineaInvestigacion: event.data.PropuestaGrado.Lineainvestigacion.Id,
      Formatoproyecto: event.data.PropuestaGrado.Formatoproyecto.file.name,
      Admision: {
        Id: this.admision_id,
      },
      TipoProyecto: event.data.PropuestaGrado.Tipoproyecto,
      EnfasisProyecto: event.data.PropuestaGrado.Enfasis,
    }
    console.log(propuesta);
    
    if (event.valid) {
      if (this.info_propuesta_grado === undefined) {
        this.createPropuestaGrado(propuesta);
      } else {
        this.updatePropuestaGrado(propuesta);
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
        this.formPropuestaGrado.campos[this.getIndexForm('Grupoinvestigacion')].opciones = list.listGrupoInvestigacion[0];
        this.formPropuestaGrado.campos[this.getIndexForm('Lineainvestigacion')].opciones = list.listLineaInvestigacion[0];
        this.formPropuestaGrado.campos[this.getIndexForm('Enfasis')].opciones = list.listEnfasisProyecto[0];
        this.formPropuestaGrado.campos[this.getIndexForm('Tipoproyecto')].opciones = list.listTipoProyecto[0];
      },
    );
  }

}
