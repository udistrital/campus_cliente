import { Component, OnInit, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserService } from '../../../@core/data/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-articulo',
  templateUrl: './list-articulo.component.html',
  styleUrls: ['./list-articulo.component.scss'],
  })
export class ListArticuloComponent implements OnInit {
  uid: number;
  eid: number;
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
        Tipo: {
          title: this.translate.instant('GLOBAL.tipo'),
          // type: 'tipo_articulo;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Nombre: {
          title: this.translate.instant('GLOBAL.nombre'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Idioma: {
          title: this.translate.instant('GLOBAL.idioma'),
          // type: 'string;',
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
        Revista: {
          title: this.translate.instant('GLOBAL.revista'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Volumen: {
          title: this.translate.instant('GLOBAL.volumen'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Fasciculo: {
          title: this.translate.instant('GLOBAL.fasciculo'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Serie: {
          title: this.translate.instant('GLOBAL.serie'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Ubicacion: {
          title: this.translate.instant('GLOBAL.ubicacion'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        MedioDivulgacion: {
          title: this.translate.instant('GLOBAL.mediodivulgacion'),
          // type: 'medio_divulgacion;',
          valuePrepareFunction: (value) => {
            // console.info(value.Nombre);
            return value.Nombre;
          },
        },
        Url: {
          title: this.translate.instant('GLOBAL.url'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Doi: {
          title: this.translate.instant('GLOBAL.doi'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
      },
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.produccionAcademicaService.get('articulo/?query=Persona:' + this.userService.getEnte())
    .subscribe(res => {
      if (res !== null) {
        const data = <Array<any>>res;
        this.source.load(data);
          }
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
      text: 'Delete Articulo!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {

      if (willDelete.value) {
        this.produccionAcademicaService.delete('articulo/', event.data).subscribe(res => {
          if (res !== null) {
            this.loadData();
            this.showToast('info', 'deleted', 'Articulo deleted');
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
