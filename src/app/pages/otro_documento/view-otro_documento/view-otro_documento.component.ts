import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { OtroDocumento } from './../../../@core/data/models/otro_documento';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-view-otro-documento',
  templateUrl: './view-otro_documento.component.html',
  styleUrls: ['./view-otro_documento.component.scss'],
})
export class ViewOtroDocumentoComponent implements OnInit {
  ente: number;
  info_otro_documento: any;
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
    this.info_otro_documento = <any>[];
    this.produccionService.get('otro_documento/?query=Persona:' + this.ente +
      '&limit=0')
      .subscribe(res => {
        this.info_otro_documento = <Array<OtroDocumento>>res;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.otro_documento'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  ngOnInit() {
  }
}
