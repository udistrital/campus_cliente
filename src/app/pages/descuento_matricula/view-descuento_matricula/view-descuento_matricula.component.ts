import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DescuentosPosgradoService } from '../../../@core/data/descuentos_posgrado.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserService } from '../../../@core/data/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-view-descuento-matricula',
  templateUrl: './view-descuento_matricula.component.html',
  styleUrls: ['./view-descuento_matricula.component.scss'],
})
export class ViewDescuentoMatriculaComponent implements OnInit {
  ente: number;
  info_descuento_matricula: any;
  data: Array<any>;

  @Input('persona_id')
  set info(info: number) {
    this.ente = info;
    this.loadData();
  }

  @Output('url_editar') url_editar: EventEmitter<boolean> = new EventEmitter();

  constructor(private translate: TranslateService,
    private descuentosService: DescuentosPosgradoService,
    private users: UserService) {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      });
      this.ente = this.users.getEnte();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.descuentosService.get('descuento_matricula/?query=ente:' + this.ente +
      '&limit=0')
      .subscribe(res => {
        if (res !== null) {
          this.info_descuento_matricula = <any>res;
        }
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.descuento_matricula'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  ngOnInit() {
  }
}
