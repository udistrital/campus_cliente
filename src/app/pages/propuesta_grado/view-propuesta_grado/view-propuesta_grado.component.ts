import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserService } from '../../../@core/data/users.service';
import { PropuestaGrado } from './../../../@core/data/models/propuesta_grado';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-view-propuesta-grado',
  templateUrl: './view-propuesta_grado.component.html',
  styleUrls: ['./view-propuesta_grado.component.scss'],
})
export class ViewPropuestaGradoComponent implements OnInit {
  info_propuesta_grado: PropuestaGrado;
  ente: number;
  admision_id: any;

  @Input('persona_id')
  set info(info: number) {
    this.ente = info;
    this.loadData();
  }

  @Output('url_editar') url_editar: EventEmitter<boolean> = new EventEmitter();

  constructor(private translate: TranslateService, private admisionesService: InscripcionService, private users: UserService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.ente = this.users.getEnte();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.admisionesService.get('admision/?query=Aspirante:' + this.ente +
      '&limit=0').subscribe(res => {
      if (res !== null) {
        this.admision_id = res[0].Id;
          this.admisionesService.get('propuesta/?query=Admision:' + this.admision_id)
            .subscribe(res2 => {
              this.info_propuesta_grado = <any>res2;
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.cargar') + '-' +
                    this.translate.instant('GLOBAL.propuesta_grado'),
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
            this.translate.instant('GLOBAL.admisiones'),
          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
      });
  }

  ngOnInit() {
  }
}
