import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { IdiomaService } from '../../../@core/data/idioma.service';
import { UserService } from '../../../@core/data/users.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-traduccion',
  templateUrl: './list-traduccion.component.html',
  styleUrls: ['./list-traduccion.component.scss'],
})
export class ListTraduccionComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  source: LocalDataSource = new LocalDataSource();

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  loading: boolean;
  percentage: number;

  constructor(
    private translate: TranslateService,
    private produccionAcademicaService: ProduccionAcademicaService,
    private idiomaService: IdiomaService,
    private users: UserService,
    private toasterService: ToasterService) {
    this.loadData();
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
    this.loading = false;
  }

  getPercentage(event) {
    this.percentage = event;
    this.result.emit(this.percentage);
  }

  cargarCampos() {
    this.settings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      mode: 'external',
      columns: {
        TipoTraduccion: {
          title: this.translate.instant('GLOBAL.tipo_traduccion'),
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Titulo: {
          title: this.translate.instant('GLOBAL.titulo_traduccion'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        NombreOriginal: {
          title: this.translate.instant('GLOBAL.nombre_original'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        IdiomaOriginal: {
          title: this.translate.instant('GLOBAL.idioma_original'),
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        IdiomaTraducido: {
          title: this.translate.instant('GLOBAL.idioma_traducido'),
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Ano: {
          title: this.translate.instant('GLOBAL.ano'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        MedioDivulgacion: {
          title: this.translate.instant('GLOBAL.medio_divulgacion'),
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
      },
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.produccionAcademicaService.get('traduccion/?query=persona:' + this.users.getEnte() +
      '&limit=0').subscribe(res => {
        if (res !== null) {
          const data = <Array<any>>res;
          const data_info = <Array<any>>[];
          data.forEach(element => {
            this.idiomaService.get('idioma/' + element.IdiomaOriginal)
              .subscribe(idioma1 => {
                if (idioma1 !== null) {
                  const idioma_1 = <any>idioma1;
                  element.IdiomaOriginal = idioma_1;
                  this.idiomaService.get('idioma/' + element.IdiomaTraducido)
                    .subscribe(idioma2 => {
                      if (idioma2 !== null) {
                        const idioma_2 = <any>idioma2;
                        element.IdiomaTraducido = idioma_2;
                        data_info.push(element);
                        this.loading = false;
                        this.getPercentage(1);
                        this.source.load(data_info);
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
    this.uid = 0;
  }

  onEdit(event): void {
    this.uid = event.data.Id;
  }

  onCreate(event): void {
    this.uid = 0;
  }

  onDelete(event): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.eliminar'),
      text: this.translate.instant('GLOBAL.eliminar') + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    };
    Swal(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          this.produccionAcademicaService.delete('traduccion/', event.data).subscribe(res => {
            if (res !== null) {
              this.loadData();
              this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
                this.translate.instant('GLOBAL.traduccion') + ' ' +
                this.translate.instant('GLOBAL.confirmarEliminar'));
            }
          },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.eliminar') + '-' +
                this.translate.instant('GLOBAL.traduccion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
        }
      });
  }

  activetab(): void {
    this.cambiotab = !this.cambiotab;
  }

  selectTab(event): void {
    if (event.tabTitle === this.translate.instant('GLOBAL.lista')) {
      this.cambiotab = false;
    } else {
      this.cambiotab = true;
    }
  }

  onChange(event) {
    if (event) {
      this.uid = 0;
      this.loadData();
    }
  }

  itemselec(event): void {
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
}
