import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserService } from '../../../@core/data/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-libro',
  templateUrl: './list-libro.component.html',
  styleUrls: ['./list-libro.component.scss'],
  })
export class ListLibroComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService,
    private produccionAcademicaService: ProduccionAcademicaService,
    private userService: UserService,
    private toasterService: ToasterService) {
    this.loadData();
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
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
        // Persona: {
        //   title: this.translate.instant('GLOBAL.persona'),
        //   // type: 'number;',
        //   valuePrepareFunction: (value) => {
        //     return value.Nombre;
        //   },
        // },
        TituloLibro: {
          title: this.translate.instant('GLOBAL.titulolibro'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TipoPublicacion: {
          title: this.translate.instant('GLOBAL.tipopublicacion'),
          // type: 'tipo_publicacion_libro;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        TituloCapitulo: {
          title: this.translate.instant('GLOBAL.titulocapitulo'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Paginas: {
          title: this.translate.instant('GLOBAL.paginas'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Ano: {
          title: this.translate.instant('GLOBAL.ano'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Mes: {
          title: this.translate.instant('GLOBAL.mes'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Isbn: {
          title: this.translate.instant('GLOBAL.isbn'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        // Ubicacion: {
        //   title: this.translate.instant('GLOBAL.ubicacion'),
        //   // type: 'number;',
        //   valuePrepareFunction: (value) => {
        //     return value;
        //   },
        // },
        MedioDivulgacion: {
          title: this.translate.instant('GLOBAL.mediodivulgacion'),
          // type: 'medio_divulgacion;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        // MedioPublicacion: {
        //   title: this.translate.instant('GLOBAL.mediopublicacion'),
        //   // type: 'medio_publicacion;',
        //   valuePrepareFunction: (value) => {
        //     return value.Nombre;
        //   },
        // },
        // Editorial: {
        //   title: this.translate.instant('GLOBAL.editorial'),
        //   // type: 'string;',
        //   valuePrepareFunction: (value) => {
        //     return value;
        //   },
        // },
      },
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.produccionAcademicaService.get('libro/?query=persona:' + this.userService.getEnte())
    .subscribe(res => {
      if (res !== null) {
        const data = <Array<any>>res;
        this.source.load(data);

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

  ngOnInit() {
  }

  onEdit(event): void {
    this.uid = event.data.Id;
    this.activetab();
  }

  onCreate(event): void {
    this.uid = 0;
    this.activetab();
  }

  onDelete(event): void {
    const opt: any = {
      title: 'Deleting?',
      text: 'Delete Libro!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {

      if (willDelete.value) {
        this.produccionAcademicaService.delete('libro/', event.data).subscribe(res => {
          if (res !== null) {
            this.loadData();
            this.showToast('info', 'deleted', 'Libro deleted');
            }
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
      this.loadData();
      this.cambiotab = !this.cambiotab;
    }
  }


  itemselec(event): void {
    // console.log("afssaf");
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
