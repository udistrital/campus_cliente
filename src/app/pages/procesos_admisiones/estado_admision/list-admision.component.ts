import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../../@core/data/users.service';
import { AdmisionesService } from '../../../@core/data/admisiones.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-list-admision',
  templateUrl: './list-admision.component.html',
  styleUrls: ['./list-admision.component.scss'],
})
export class ListAdmisionComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  settings: any;
  data: any;
  ente: number;
  posgrados = [];
  periodo = [];
  selectedValuePrograma: any;
  selectedValuePeriodo: any;
  source: LocalDataSource = new LocalDataSource();

  @Output() eventChange = new EventEmitter();

  constructor(private translate: TranslateService,
    private admisionesService: AdmisionesService,
    private userService: UserService,
    private programaService: ProgramaAcademicoService) {
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
    this.ente = this.userService.getEnte();
    this.ente = 4;
    this.loadData();
  }

  cargarCampos() {
    this.settings = {
      hideSubHeader: true,
      edit: {
        editButtonContent: '<i class="nb-person"></i>',
      },
      actions: {
        columnTitle: this.translate.instant('GLOBAL.acciones'),
        add: false,
        edit: true,
        delete: false,
      },
      mode: 'external',
      columns: {
        ProgramaAcademico: {
          title: this.translate.instant('GLOBAL.programa_academico'),
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Periodo: {
          title: this.translate.instant('GLOBAL.periodo_academico'),
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        EstadoAdmision: {
          title: this.translate.instant('GLOBAL.estado_admision'),
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
    this.admisionesService.get('admision/?query=Aspirante:' + this.ente +
      '&limit=0').subscribe(res => {
        if (res !== null) {
          const data = <Array<any>>res;
          for (let index = 0; index < data.length; index++) {
            const datos = data[index];
            this.programaService.get('programa_academico/' + datos.ProgramaAcademico)
              .subscribe(programa => {
                if (programa !== null) {
                  data[index].ProgramaAcademico = <any>programa;
                  if (index === (data.length - 1)) {
                    this.source.load(data);
                  }
                }
              },
                (error: HttpErrorResponse) => {
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    footer: this.translate.instant('GLOBAL.cargar') + '-' +
                      this.translate.instant('GLOBAL.admisiones') + '|' +
                      this.translate.instant('GLOBAL.programa_academico'),
                    confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                  });
                });
          }
        }
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.admision'),
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
  }

  crearInscripcion() {
    this.onCreate(true);
  }
}
