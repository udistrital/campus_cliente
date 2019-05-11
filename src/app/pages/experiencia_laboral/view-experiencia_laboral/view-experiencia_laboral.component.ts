import { CampusMidService } from './../../../@core/data/campus_mid.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { UbicacionesService } from '../../../@core/data/ubicaciones.service';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-view-experiencia-laboral',
  templateUrl: './view-experiencia_laboral.component.html',
  styleUrls: ['./view-experiencia_laboral.component.scss'],
})
export class ViewExperienciaLaboralComponent implements OnInit {
  ente: number;
  info_experiencia_laboral: any;
  data: Array<any>;

  @Input('persona_id')
  set info(info: number) {
    this.ente = info;
    this.loadData();
  }

  @Output('url_editar') url_editar: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private translate: TranslateService,
    private campusMidService: CampusMidService,
    private ubicacionesService: UbicacionesService,
    private experienciaService: ExperienciaService,
    private users: UserService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.ente = this.users.getEnte();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.info_experiencia_laboral = <any>[];
    this.experienciaService.get('experiencia_laboral/?query=Persona:' + this.ente)
      .subscribe(res => {
        if (res !== null) {
          this.data = <Array<any>>res;
          this.data.forEach(element => {
            this.campusMidService.get('organizacion/identificacionente/?Ente=' + element.Organizacion)
              .subscribe(organizacion => {
                if (organizacion !== null) {
                  const organizacion_info = <any>organizacion;
                  element.Organizacion = organizacion_info;
                  this.ubicacionesService.get('lugar/' + organizacion_info.Ubicacion[0].UbicacionEnte.Lugar)
                    .subscribe(pais => {
                      if (pais !== null) {
                        const pais_info = <any>pais;
                        element.PaisEmpresa = pais_info.Nombre;
                        // console.info(JSON.stringify(element));
                        this.info_experiencia_laboral.push(element);
                      }
                    },
                      (error: HttpErrorResponse) => {
                        Swal({
                          type: 'error',
                          title: error.status + '',
                          text: this.translate.instant('ERROR.' + error.status),
                          footer: this.translate.instant('GLOBAL.cargar') + '-' +
                            this.translate.instant('GLOBAL.experiencia_laboral') + '|' +
                            this.translate.instant('GLOBAL.pais_empresa'),
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
                    footer: this.translate.instant('GLOBAL.cargar') + '-' +
                      this.translate.instant('GLOBAL.experiencia_laboral') + '|' +
                      this.translate.instant('GLOBAL.nombre_empresa'),
                    confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                  });
                });
          });
        }
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.experiencia_laboral'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  ngOnInit() {
  }
}
