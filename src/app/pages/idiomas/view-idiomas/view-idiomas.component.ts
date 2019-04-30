import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IdiomaService } from '../../../@core/data/idioma.service';
import { UserService } from '../../../@core/data/users.service';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-view-idiomas',
  templateUrl: './view-idiomas.component.html',
  styleUrls: ['./view-idiomas.component.scss'],
})
export class ViewIdiomasComponent implements OnInit {
  ente: number;

  @Input('persona_id')
  set info(info: number) {
    this.ente = info;
    this.loadInfoIdioma();
  };

  @Output('url_editar') url_editar: EventEmitter<boolean> = new EventEmitter();

  info_idioma: any;

  constructor(
    private translate: TranslateService,
    private users: UserService,
    private idiomaService: IdiomaService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.ente = this.users.getEnte();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  public editar(): void {
    this.url_editar.emit(true);
  }

  public loadInfoIdioma(): void {
    this.idiomaService.get('conocimiento_idioma/?query=persona:' + this.ente)
      .subscribe(res => {
        if (res !== null) {
          this.info_idioma = <Array<any>>res;
        }
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.idiomas'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  ngOnInit() {
  }
}
