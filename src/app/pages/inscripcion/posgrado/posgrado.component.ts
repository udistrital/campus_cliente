import { Component, OnInit, OnChanges } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ImplicitAutenticationService } from './../../../@core/utils/implicit_autentication.service';
import { PersonaService } from '../../../@core/data/persona.service';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { UtilidadesService } from '../../../@core/utils/utilidades.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
import { AdmisionesService } from '../../../@core/data/admisiones.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Admision } from '../../../@core/data/models/admision';
import { IMAGENES } from './imagenes';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'ngx-posgrado',
  templateUrl: './posgrado.component.html',
  styleUrls: ['./posgrado.component.scss'],
})
export class PosgradoComponent implements OnInit, OnChanges {

  info_persona_id: number;
  info_ente_id: number;
  info_info_persona: any;
  datos_persona: any;
  admision: Admision;
  step = 0;
  cambioTab = 0;
  nForms: number;

  percentage_info: number = 0;
  percentage_acad: number = 0;
  percentage_expe: number = 0;
  percentage_proy: number = 0;
  percentage_prod: number = 0;
  percentage_desc: number = 0;
  percentage_docu: number = 0;
  percentage_total: number = 0;

  total: boolean = false;

  percentage_tab_info = [];
  percentage_tab_expe = [];
  percentage_tab_acad = [];
  percentage_tab_proy = [];
  percentage_tab_prod = [];
  percentage_tab_desc = [];
  percentage_tab_docu = [];
  posgrados = [];

  show_info = false;
  show_profile = false;
  show_acad = false;
  show_expe = false;
  show_proy = false;
  show_prod = false;
  show_desc = false;
  show_docu = false;

  info_contacto: boolean;
  info_persona: boolean;
  info_caracteristica: boolean;
  button_politica: boolean = true;
  programa_seleccionado: any;
  selectedValue: any;
  imagenes: any;

  constructor(
    private autenticacion: ImplicitAutenticationService,
    private personaService: PersonaService,
    private translate: TranslateService,
    private campusMidService: CampusMidService,
    private admisionesService: AdmisionesService,
    private programaService: ProgramaAcademicoService) {
    this.imagenes = IMAGENES;
    this.translate = translate;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.getInfoPersonaId();
    this.loadInfoPostgrados();
    this.total = false; // true;
  }

  setPercentage_info(number, tab) {
    this.percentage_tab_info[tab] = (number * 100) / 3;
    this.percentage_info = Math.round(UtilidadesService.getSumArray(this.percentage_tab_info));
    this.setPercentage_total();
  }

  setPercentage_acad(number, tab) {
    this.percentage_tab_acad[tab] = (number * 100) / 2;
    this.percentage_acad = Math.round(UtilidadesService.getSumArray(this.percentage_tab_acad));
    this.setPercentage_total();
  }

  setPercentage_expe(number, tab) {
    this.percentage_tab_expe[tab] = (number * 100) / 1;
    this.percentage_expe = Math.round(UtilidadesService.getSumArray(this.percentage_tab_expe));
    this.setPercentage_total();
  }

  setPercentage_proy(number, tab) {
    this.percentage_tab_proy[tab] = (number * 100) / 1;
    this.percentage_proy = Math.round(UtilidadesService.getSumArray(this.percentage_tab_proy));
    this.setPercentage_total();
  }

  setPercentage_desc(number, tab) {
    this.percentage_tab_desc[tab] = (number * 100) / 1;
    this.percentage_desc = Math.round(UtilidadesService.getSumArray(this.percentage_tab_desc));
    this.setPercentage_total();
  }

  setPercentage_docu(number, tab) {
    this.percentage_tab_docu[tab] = (number * 100) / 1;
    this.percentage_docu = Math.round(UtilidadesService.getSumArray(this.percentage_tab_docu));
    this.setPercentage_total();
  }

  setPercentage_prod(number, tab) {
    this.percentage_tab_prod[tab] = (number * 100) / 1;
    this.percentage_prod = Math.round(UtilidadesService.getSumArray(this.percentage_tab_prod));
    this.setPercentage_total();
  }

  setPercentage_total() {
    this.percentage_total = Math.round(UtilidadesService.getSumArray(this.percentage_tab_info)) / 5;
    this.percentage_total += Math.round(UtilidadesService.getSumArray(this.percentage_tab_acad)) / 5;
    this.percentage_total += Math.round(UtilidadesService.getSumArray(this.percentage_tab_docu)) / 5;
    this.percentage_total += Math.round(UtilidadesService.getSumArray(this.percentage_tab_desc)) / 5;
    this.percentage_total += Math.round(UtilidadesService.getSumArray(this.percentage_tab_proy)) / 5;
    if (this.percentage_total >= 100) {
      this.total = false;
    }
  }

  traerInfoPersona(event, tab) {
    this.setPercentage_info(event, tab);
    if (event !== 0) this.getInfoPersonaId();
  }

  loadInfoPostgrados() {
    this.programaService.get('programa_academico/?limit=0')
      .subscribe(res => {
        const r = <any>res;
        if (res !== null && r.Type !== 'error') {
          this.posgrados = <any>res;
          this.admisionesService.get(`admision/?query=Aspirante:${this.info_ente_id}`)
            .subscribe(res_2 => {
              const r_2 = <any>res_2;
              if (res_2 !== null && r_2.Type !== 'error') {
                this.selectedValue = res[res_2[0].ProgramaAcademico - 1];
              }
            },
              (error_2: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error_2.status + '',
                  text: this.translate.instant('ERROR.' + error_2.status),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
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

  getInfoPersonaId() {
    interface ResponseId {
      Id: number;
      Ente: number;
    }
    if (this.autenticacion.live()) {
      this.personaService.get('persona/?query=Usuario:' + this.autenticacion.getPayload().sub)
        .subscribe(res => {
          const r = <any>res;
          if (res !== null && r.Type !== 'error') {
            this.info_info_persona = <ResponseId>res[0];
            this.info_persona_id = this.info_info_persona.Id;
            this.info_ente_id = this.info_info_persona.Ente;
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_persona_id = undefined;
      this.info_ente_id = undefined;
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  perfil_editar(event): void {
    switch (event) {
      case 'info_contacto':
        this.show_info = true;
        this.show_profile = false;
        this.show_acad = false;
        this.show_expe = false;
        this.info_contacto = true;
        this.info_caracteristica = false;
        this.info_persona = false;
        this.show_proy = false;
        this.show_desc = false;
        this.show_docu = false;
        this.show_prod = false;
        break;
      case 'info_caracteristica':
        this.show_info = true;
        this.show_profile = false;
        this.show_acad = false;
        this.show_expe = false;
        this.info_contacto = false;
        this.info_caracteristica = true;
        this.info_persona = false;
        this.show_proy = false;
        this.show_docu = false;
        this.show_desc = false;
        this.show_prod = false;
        break;
      case 'info_persona':
        this.show_info = true;
        this.show_profile = false;
        this.show_acad = false;
        this.show_expe = false;
        this.info_contacto = false;
        this.info_caracteristica = false;
        this.info_persona = true;
        this.show_desc = false;
        this.show_docu = false;
        this.show_proy = false;
        this.show_prod = false;
        break;
      case 'experiencia_laboral':
        this.show_info = false;
        this.show_profile = false;
        this.info_contacto = false;
        this.info_caracteristica = false;
        this.show_acad = false;
        this.show_docu = false;
        this.show_expe = true;
        this.info_persona = false;
        this.show_proy = false;
        this.show_desc = false;
        this.show_prod = false;
        break;
      case 'formacion_academica':
        this.show_info = false;
        this.show_docu = false;
        this.info_contacto = false;
        this.info_caracteristica = false;
        this.show_profile = false;
        this.show_acad = true;
        this.info_persona = false;
        this.show_expe = false;
        this.show_proy = false;
        this.show_desc = false;
        this.show_prod = false;
        break;
      case 'produccion_academica':
        this.show_info = false;
        this.show_profile = false;
        this.show_acad = false;
        this.show_expe = false;
        this.show_docu = false;
        this.info_contacto = false;
        this.info_caracteristica = false;
        this.info_persona = false;
        this.show_desc = false;
        this.show_proy = false;
        this.show_prod = true;
        break;
      case 'documento_programa':
        this.show_info = false;
        this.show_profile = false;
        this.show_acad = false;
        this.show_expe = false;
        this.info_contacto = false;
        this.show_docu = true;
        this.info_caracteristica = false;
        this.info_persona = false;
        this.show_desc = false;
        this.show_proy = false;
        this.show_prod = false;
        break;
      case 'descuento_matricula':
        this.show_info = false;
        this.show_profile = false;
        this.show_acad = false;
        this.show_expe = false;
        this.info_contacto = false;
        this.show_docu = false;
        this.info_caracteristica = false;
        this.info_persona = false;
        this.show_desc = true;
        this.show_proy = false;
        this.show_prod = false;
        break;
      case 'propuesta_grado':
        this.show_info = false;
        this.show_profile = false;
        this.show_docu = false;
        this.show_acad = false;
        this.show_expe = false;
        this.info_contacto = false;
        this.info_caracteristica = false;
        this.show_proy = true;
        this.info_persona = false;
        this.show_desc = false;
        this.show_prod = false;
        break;
      case 'perfil':
        this.show_info = false;
        this.show_profile = true;
        this.show_acad = false;
        this.info_contacto = false;
        this.show_docu = false;
        this.info_caracteristica = false;
        this.show_desc = false;
        this.show_expe = false;
        this.show_proy = false;
        this.show_prod = false;
        this.show_desc = false;
        break;
      default:
        this.show_info = false;
        this.show_docu = false;
        this.show_profile = false;
        this.show_acad = false;
        this.info_contacto = false;
        this.info_caracteristica = false;
        this.show_desc = false;
        this.show_expe = false;
        this.show_proy = false;
        this.show_prod = false;
        this.show_desc = false;
        break;
    }
  }

  selectTab(event): void {
    if (event.tabTitle === this.translate.instant('GLOBAL.info_persona')) {
      if (this.info_persona)
        this.perfil_editar('info_persona');
    } else if (event.tabTitle === this.translate.instant('GLOBAL.info_caracteristica')) {
      this.perfil_editar('info_caracteristica');
    } else if (event.tabTitle === this.translate.instant('GLOBAL.informacion_contacto')) {
      this.perfil_editar('info_contacto');
    }
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  pruebita() {
    window.localStorage.setItem('programa', this.selectedValue.Id);
  }

  Inscribirse() {
    this.DatosMidPersona();
  }

  DatosMidPersona() {
    this.captureScreen();
    this.campusMidService.get(`persona/ConsultaPersona/?id=${this.info_ente_id}`)
      .subscribe(res => {
        const r = <any>res;
        if (res !== null && r.Type !== 'error') {
          this.datos_persona = r;
          this.admision.EstadoAdmision.Id = 2;
          this.UpdateEstadoAdmision();
        }
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

  UpdateEstadoAdmision() {
    this.admisionesService.put('admision', this.admision, this.admision.Id)
      .subscribe(res_ad => {
        const r_ad = <any>res_ad;
        if (res_ad !== null && r_ad.Type !== 'error') {
          this.captureScreen();
        }
      },
        (error_ad: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error_ad.status + '',
            text: this.translate.instant('ERROR.' + error_ad.status),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  public captureScreen() {
    const data = document.getElementById('demo-capture');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = this.imagenes.escudo;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'letter');
      pdf.setFontSize(20);
      pdf.addImage(imgData, 'PNG', 10, 10, 92, 35);
      pdf.text(`Comprobante de inscripción`, 65, 55);
      pdf.setFontSize(12);

      pdf.text(`Nombres: ${this.datos_persona['PrimerNombre']} ${this.datos_persona['SegundoNombre']}`, 15, 68);
      pdf.text(`Apellidos: ${this.datos_persona['PrimerApellido']} ${this.datos_persona['SegundoApellido']}`, 15, 75);
      pdf.text(`${this.datos_persona['TipoIdentificacion']['CodigoAbreviacion']}: ${this.datos_persona['NumeroDocumento']}`, 15, 82);
      pdf.text(`Fecha de inscripción: ${this.datos_persona['TipoIdentificacion']['CodigoAbreviacion']}: ${this.datos_persona['NumeroDocumento']}`, 15, 89);
      pdf.text(`Programa académico: ${this.datos_persona['TipoIdentificacion']['CodigoAbreviacion']}: ${this.datos_persona['NumeroDocumento']}`, 15, 96);

      pdf.text(`Formulario: `, 15, 103);
      pdf.addImage(contentDataURL, 'PNG', 0, 108, imgWidth, imgHeight);
      pdf.setFontSize(9);
      pdf.text(`Universidad Distrital Francisco José de Caldas`, 78, 256);
      pdf.text(`Carrera 7 # 40B - 53 - Bogotá D.C. - Colombia`, 78, 262);
      pdf.text(`Teléfono (Colombia) : +57 3 323-9300`, 83, 267);

      const nombre_archivo = `${this.datos_persona['PrimerNombre']}_${this.datos_persona['NumeroDocumento']}`;
      pdf.save(`${nombre_archivo}.pdf`);
    });
  }
}
