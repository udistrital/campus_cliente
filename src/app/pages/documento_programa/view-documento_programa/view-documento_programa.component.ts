import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentoProgramaService } from '../../../@core/data/documentos_programa.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserService } from '../../../@core/data/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-view-documento-programa',
  templateUrl: './view-documento_programa.component.html',
  styleUrls: ['./view-documento_programa.component.scss'],
})
export class ViewDocumentoProgramaComponent implements OnInit {
  ente: number;
  info_documento_programa: any;
  programaDocumento: any;
  data: Array<any>;

  @Input('persona_id')
  set info(info: number) {
    this.ente = info;
    this.loadData();
  }

  @Output('url_editar') url_editar: EventEmitter<boolean> = new EventEmitter();

  constructor(private translate: TranslateService,
    private documentoProgramaService: DocumentoProgramaService,
    private users: UserService) {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      });
      this.ente = this.users.getEnte();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.info_documento_programa = <any>[];
    this.documentoProgramaService.get('soporte_documento_programa/?query=Ente:' + this.ente +
      '&limit=0')
      .subscribe(res => {
        if (res !== null) {
          this.data = <Array<any>>res;
          this.data.forEach(element => {
            this.documentoProgramaService.get('documento_programa/' + element.DocumentoPrograma.Id)
              .subscribe(documentoPrograma => {
                if (documentoPrograma !== null) {
                  this.programaDocumento =  <any>documentoPrograma;
                  element.DocumentoPrograma = this.programaDocumento;
                  this.documentoProgramaService.get('tipo_documento_programa/' +
                    this.programaDocumento.TipoDocumentoPrograma.Id)
                    .subscribe(tipoDocumentoPrograma => {
                      if (tipoDocumentoPrograma !== null) {
                        element.TipoDocumentoPrograma = <any>tipoDocumentoPrograma;
                        this.info_documento_programa.push(element);
                      }
                    },
                      (error: HttpErrorResponse) => {
                        Swal({
                          type: 'error',
                          title: error.status + '',
                          text: this.translate.instant('ERROR.' + error.status),
                          footer: this.translate.instant('GLOBAL.cargar') + '-' +
                            this.translate.instant('GLOBAL.tipo_documento_programa'),
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
                      this.translate.instant('GLOBAL.documento_programa'),
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
              this.translate.instant('GLOBAL.documento_programa'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  ngOnInit() {
  }
}
