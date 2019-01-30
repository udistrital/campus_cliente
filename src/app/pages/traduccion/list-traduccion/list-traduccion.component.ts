import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { UserService } from '../../../@core/data/users.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
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

  constructor(
    private translate: TranslateService,
    private produccionAcademicaService: ProduccionAcademicaService,
    private users: UserService,
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
        TipoTraduccion: {
          title: this.translate.instant('GLOBAL.tipotraduccion'),
          // type: 'tipo_traduccion;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Titulo: {
          title: this.translate.instant('GLOBAL.titulo_traduccion'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        NombreOriginal: {
          title: this.translate.instant('GLOBAL.nombreoriginal'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Autor: {
          title: this.translate.instant('GLOBAL.autor'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        IdiomaOriginal: {
          title: this.translate.instant('GLOBAL.idiomaoriginal'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        IdiomaTraducido: {
          title: this.translate.instant('GLOBAL.idiomatraducido'),
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
        MedioDivulgacion: {
          title: this.translate.instant('GLOBAL.mediodivulgacion'),
          // type: 'medio_divulgacion;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Edicion: {
          title: this.translate.instant('GLOBAL.edicion'),
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
      },
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.produccionAcademicaService.get('traduccion/?query=persona:' + this.users.getEnte())
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
      text: 'Delete Traduccion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {

      if (willDelete.value) {
        this.produccionAcademicaService.delete('traduccion/', event.data).subscribe(res => {
          if (res !== null) {
            this.loadData();
            this.showToast('info', 'deleted', 'Traduccion deleted');
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
