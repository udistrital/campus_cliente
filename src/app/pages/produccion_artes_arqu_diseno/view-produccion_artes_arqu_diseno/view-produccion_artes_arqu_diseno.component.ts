import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ProduccionArtesArquDiseno } from './../../../@core/data/models/produccion_artes_arqu_diseno';
import { TipoDisciplina } from './../../../@core/data/models/tipo_disciplina';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-view-produccion-artes-arqu-diseno',
  templateUrl: './view-produccion_artes_arqu_diseno.component.html',
  styleUrls: ['./view-produccion_artes_arqu_diseno.component.scss'],
})
export class ViewProduccionArtesArquDisenoComponent implements OnInit {
  ente: number;
  info_produccion_artes_arqu_diseno: any;
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
    private users: UserService) {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      });
      this.ente = this.users.getEnte();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.info_produccion_artes_arqu_diseno = <any>[];
    this.produccionService.get('produccion_artes_arqu_diseno/?query=Persona:' + this.ente +
      '&limit=0')
      .subscribe(res => {
        this.data = <Array<ProduccionArtesArquDiseno>>res;
        this.data.forEach(element => {
        this.produccionService.get('tipo_disciplina/' + element.TipoDisciplina.Id)
          .subscribe(res2 => {
            if (res2 !== null) {
              element.TipoDisciplina = <TipoDisciplina>res2;
              this.info_produccion_artes_arqu_diseno.push(<ProduccionArtesArquDiseno>element);
            }
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.cargar') + '-' +
                  this.translate.instant('GLOBAL.produccion_artes_arqu_diseno') + '|' +
                  this.translate.instant('GLOBAL.tipo_disciplina'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
          });
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.produccion_artes_arqu_diseno'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  ngOnInit() {
  }
}
