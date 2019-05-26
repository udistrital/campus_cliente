import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { IdiomaService } from '../../../@core/data/idioma.service';
import { Traduccion } from './../../../@core/data/models/traduccion';
import { Idioma } from './../../../@core/data/models/idioma';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserService } from '../../../@core/data/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-view-traduccion',
  templateUrl: './view-traduccion.component.html',
  styleUrls: ['./view-traduccion.component.scss'],
})
export class ViewTraduccionComponent implements OnInit {
  ente: number;
  info_traduccion: any;
  data: Array<any>;

  @Input('persona_id')
  set info(info: number) {
    this.ente = info;
    this.loadData();
  }

  @Output('url_editar') url_editar: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private translate: TranslateService,
    private produccionService: ProduccionAcademicaService,
    private idiomaService: IdiomaService,
    private users: UserService) {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      });
      this.ente = this.users.getEnte();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.info_traduccion = <any>[];
    this.produccionService.get('traduccion/?query=persona:' + this.ente +
      '&limit=0').subscribe(res => {
        if (res !== null) {
          this.data = <Array<Traduccion>>res;
          this.data.forEach(element => {
            this.idiomaService.get('idioma/' + element.IdiomaOriginal)
              .subscribe(idioma1 => {
                if (idioma1 !== null) {
                  const idioma_1 = <Idioma>idioma1;
                  element.IdiomaOriginal = idioma_1;
                  this.idiomaService.get('idioma/' + element.IdiomaTraducido)
                    .subscribe(idioma2 => {
                      if (idioma2 !== null) {
                        const idioma_2 = <Idioma>idioma2;
                        element.IdiomaTraducido = idioma_2;
                        this.info_traduccion.push(<Traduccion>element);
                      }
                    },
                      (error: HttpErrorResponse) => {
                        Swal({
                          type: 'error',
                          title: error.status + '',
                          text: this.translate.instant('ERROR.' + error.status),
                          footer: this.translate.instant('GLOBAL.cargar') + '-' +
                            this.translate.instant('GLOBAL.traduccion | GLOBAL.idioma'),
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
                      this.translate.instant('GLOBAL.traduccion | GLOBAL.idioma'),
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
              this.translate.instant('GLOBAL.traducciones'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  ngOnInit() {
  }
}
