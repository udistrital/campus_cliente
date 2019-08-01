import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  universidad: any;
  normatividad: any;
  recomendados: any;
  contactenos: any;
  final: any;
  copyright: any;
  social: any;

  constructor(public translate: TranslateService) {
    this.translate = translate;
    this.universidad = {
      title: this.translate.instant('FOOTER.nombre'),
      nit: 'NIT. 899.999.230.7',
      norma: this.translate.instant('FOOTER.norma'),
      creacion: [{
        label: this.translate.instant('FOOTER.acuerdo') + ' ' +
          this.translate.instant('FOOTER.acuerdo_dato'),
        title: this.translate.instant('FOOTER.acuerdo'),
        url: 'https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=3499',
      }],
      acreditacion: [{
        label: this.translate.instant('FOOTER.acreditacion') + ' - ' +
          this.translate.instant('FOOTER.acreditacion_resolucion'),
        title: this.translate.instant('FOOTER.acreditacion'),
        url: 'http://autoevaluacion.udistrital.edu.co/version3/varios/acreditacion_23096_institucional.pdf',
      }],
      representante: [{
        subtitle: this.translate.instant('FOOTER.representante'),
        nombre: 'Rector Dr. Ricardo García Duarte',
        correo: 'rectoria@udistrital.edu.co',
      }],
    };
    this.final = {
      list: [{
        url: 'http://www.bogota.gov.co/sdqs',
        title: this.translate.instant('FOOTER.sdqs_nombre'),
        label: this.translate.instant('FOOTER.sdqs'),
      }, {
        url: '#',
        title: this.translate.instant('FOOTER.mapa_sitio'),
        label: this.translate.instant('FOOTER.mapa_sitio'),
      }, {
        url: 'https://www.udistrital.edu.co/politicas-de-privacidad',
        title: this.translate.instant('FOOTER.politica_privacidad'),
        label: this.translate.instant('FOOTER.politica_privacidad'),
      }, {
        url: 'https://www.udistrital.edu.co/contacto',
        title: this.translate.instant('FOOTER.contactenos'),
        label: this.translate.instant('FOOTER.contactenos'),
      }],
    };
    this.normatividad = {
      title: this.translate.instant('FOOTER.normatividad'),
      seccion: [{
        subtitle: this.translate.instant('FOOTER.academica'),
        list: [{
          label: this.translate.instant('FOOTER.derechos_pecuniarios') + ' 2019',
          title: this.translate.instant('FOOTER.derechos_pecuniarios'),
          url: 'http://sgral.udistrital.edu.co/xdata/sgral/cir_2019-001.pdf',
        }, {
          label: this.translate.instant('FOOTER.estatuto_academico'),
          title: this.translate.instant('FOOTER.estatuto_academico'),
          url: 'http://sgral.udistrital.edu.co/xdata/csu/acu_1996-004.pdf',
        }, {
          label: this.translate.instant('FOOTER.estatuto_estudiantil'),
          title: this.translate.instant('FOOTER.estatuto_estudiantil'),
          url: 'http://sgral.udistrital.edu.co/xdata/csu/acu_1993-027.pdf',
        }, {
          label: this.translate.instant('FOOTER.estatuto_docente'),
          title: this.translate.instant('FOOTER.estatuto_docente'),
          url: 'http://sgral.udistrital.edu.co/xdata/csu/acu_2002-011.pdf',
        }],
      },
      {
        subtitle: this.translate.instant('FOOTER.general'),
        list: [{
          label: this.translate.instant('FOOTER.estatuto_general'),
          title: this.translate.instant('FOOTER.estatuto_general'),
          url: 'http://sgral.udistrital.edu.co/xdata/csu/acu_1997-003.pdf',
        }, {
          label: this.translate.instant('FOOTER.pui'),
          title: this.translate.instant('FOOTER.pui_nombre'),
          url: 'http://www1.udistrital.edu.co:8080/documents/11171/0b3bf491-87f5-4e5d-97f2-dc3c70a6fe0e',
        }],
      }],
    };
    this.recomendados = {
      title: this.translate.instant('FOOTER.recomendados'),
      list: [{
        title: this.translate.instant('FOOTER.distrinautas'),
        label: this.translate.instant('FOOTER.distrinautas'),
        url: 'http://comunidad.udistrital.edu.co/distrinautas/',
      }, {
        title: this.translate.instant('FOOTER.elecciones'),
        label: this.translate.instant('FOOTER.elecciones_nombre'),
        url: 'http://comunidad.udistrital.edu.co/elecciones/',
      }, {
        title: this.translate.instant('FOOTER.transparencia'),
        label: this.translate.instant('FOOTER.transparencia'),
        url: 'https://www.udistrital.edu.co/transparencia',
      }, {
        title: this.translate.instant('FOOTER.sga'),
        label: this.translate.instant('FOOTER.sga'),
        url: 'http://comunidad.udistrital.edu.co/piga/',
      }, {
        title: this.translate.instant('FOOTER.reforma'),
        label: this.translate.instant('FOOTER.reforma_nombre'),
        url: 'http://comunidad.udistrital.edu.co/reformaud/',
      }, {
        title: this.translate.instant('FOOTER.hora_legal'),
        label: this.translate.instant('FOOTER.hora_legal') + '	',
        url: 'http://horalegal.inm.gov.co/',
      }],
    };
    this.contactenos = {
      title: this.translate.instant('FOOTER.contactenos'),
      datos: [{
        dato: this.translate.instant('FOOTER.direccion'),
        title: this.translate.instant('FOOTER.direccion'),
        url: 'https://www.google.com.co/maps/place/Cra.+7+%2340b-53,+Bogot%C3%A1/@4.6280856,-74.0674698,17z/' +
        'data=!3m1!4b1!4m5!3m4!1s0x8e3f9a287591013f:0x5cce5fbab6b77b9b!8m2!3d4.6280856!4d-74.0652811?hl=es',
      }, {
        dato: this.translate.instant('FOOTER.lugar'),
      }, {
        label: this.translate.instant('FOOTER.codigo_postal'),
        dato: '11021 - 110231588',
      }, {
        dato: '(+57 1) 3239300',
        title: this.translate.instant('FOOTER.centro_relevo'),
        url: 'http://www.centroderelevo.gov.co/632/w3-channel.html',
      }, {
        dato: '01 - 8000 - 914410',
        title: this.translate.instant('FOOTER.centro_relevo'),
        url: 'http://www.centroderelevo.gov.co/632/w3-channel.html',
      }, {
        label: this.translate.instant('FOOTER.atencion_ciudadano') + ' - ' +
          this.translate.instant('FOOTER.centro_relevo'),
        dato: '(+57 1) 3238314',
        title: this.translate.instant('FOOTER.centro_relevo'),
        url: 'http://www.centroderelevo.gov.co/632/w3-channel.html',
      }, {
        label: this.translate.instant('FOOTER.atencion_ciudadano'),
        dato: 'atencion@udistrital.edu.co',
        title: this.translate.instant('FOOTER.atencion_ciudadano'),
        url: 'mailto:atencion@udistrital.edu.co',
      }, {
        label: this.translate.instant('FOOTER.notificacion_judicial'),
        dato: 'notificacionjudicial@udistrital.edu.co',
        title: this.translate.instant('FOOTER.notificacion_judicial'),
        url: 'mailto:notificacionjudicial@udistrital.edu.co',
      }, {
        dato: this.translate.instant('FOOTER.directorio'),
        title: this.translate.instant('FOOTER.directorio'),
        url: 'https://www.udistrital.edu.co/directorio',
      }, {
        dato: this.translate.instant('FOOTER.horario'),
      }],
    };
    this.social = {
      list: [{
        url: 'https://www.facebook.com/UniversidadDistrital',
        title: 'Facebook',
        class: 'facebook',
      }, {
        url: 'https://twitter.com/udistrital',
        title: 'Twitter',
        class: 'twitter',
      }, {
        url: 'https://www.instagram.com/universidaddistrital/',
        title: 'Instagram',
        class: 'instagram',
      }, {
        url: 'https://www.youtube.com/udistritaltv',
        title: 'Youtube',
        class: 'youtube',
      }],
    }
    this.copyright =  this.translate.instant('FOOTER.copyright');
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.universidad = {
        title: this.translate.instant('FOOTER.nombre'),
        nit: 'NIT. 899.999.230.7',
        norma: this.translate.instant('FOOTER.norma'),
        creacion: [{
          label: this.translate.instant('FOOTER.acuerdo') + ' ' +
            this.translate.instant('FOOTER.acuerdo_dato'),
          title: this.translate.instant('FOOTER.acuerdo'),
          url: 'https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=3499',
        }],
        acreditacion: [{
          label: this.translate.instant('FOOTER.acreditacion') + ' - ' +
            this.translate.instant('FOOTER.acreditacion_resolucion'),
          title: this.translate.instant('FOOTER.acreditacion'),
          url: 'http://autoevaluacion.udistrital.edu.co/version3/varios/acreditacion_23096_institucional.pdf',
        }],
        representante: [{
          subtitle: this.translate.instant('FOOTER.representante'),
          nombre: 'Rector Dr. Ricardo García Duarte',
          correo: 'rectoria@udistrital.edu.co',
        }],
      };
      this.final = {
        list: [{
          url: 'http://www.bogota.gov.co/sdqs',
          title: this.translate.instant('FOOTER.sdqs_nombre'),
          label: this.translate.instant('FOOTER.sdqs'),
        }, {
          url: '#',
          title: this.translate.instant('FOOTER.mapa_sitio'),
          label: this.translate.instant('FOOTER.mapa_sitio'),
        }, {
          url: 'https://www.udistrital.edu.co/politicas-de-privacidad',
          title: this.translate.instant('FOOTER.politica_privacidad'),
          label: this.translate.instant('FOOTER.politica_privacidad'),
        }, {
          url: 'https://www.udistrital.edu.co/contacto',
          title: this.translate.instant('FOOTER.contactenos'),
          label: this.translate.instant('FOOTER.contactenos'),
        }],
      };
      this.normatividad = {
        title: this.translate.instant('FOOTER.normatividad'),
        seccion: [{
          subtitle: this.translate.instant('FOOTER.academica'),
          list: [{
            label: this.translate.instant('FOOTER.derechos_pecuniarios') + ' 2019',
            title: this.translate.instant('FOOTER.derechos_pecuniarios'),
            url: 'http://sgral.udistrital.edu.co/xdata/sgral/cir_2019-001.pdf',
          }, {
            label: this.translate.instant('FOOTER.estatuto_academico'),
            title: this.translate.instant('FOOTER.estatuto_academico'),
            url: 'http://sgral.udistrital.edu.co/xdata/csu/acu_1996-004.pdf',
          }, {
            label: this.translate.instant('FOOTER.estatuto_estudiantil'),
            title: this.translate.instant('FOOTER.estatuto_estudiantil'),
            url: 'http://sgral.udistrital.edu.co/xdata/csu/acu_1993-027.pdf',
          }, {
            label: this.translate.instant('FOOTER.estatuto_docente'),
            title: this.translate.instant('FOOTER.estatuto_docente'),
            url: 'http://sgral.udistrital.edu.co/xdata/csu/acu_2002-011.pdf',
          }],
        },
        {
          subtitle: this.translate.instant('FOOTER.general'),
          list: [{
            label: this.translate.instant('FOOTER.estatuto_general'),
            title: this.translate.instant('FOOTER.estatuto_general'),
            url: 'http://sgral.udistrital.edu.co/xdata/csu/acu_1997-003.pdf',
          }, {
            label: this.translate.instant('FOOTER.pui'),
            title: this.translate.instant('FOOTER.pui_nombre'),
            url: 'http://www1.udistrital.edu.co:8080/documents/11171/0b3bf491-87f5-4e5d-97f2-dc3c70a6fe0e',
          }],
        }],
      };
      this.recomendados = {
        title: this.translate.instant('FOOTER.recomendados'),
        list: [{
          title: this.translate.instant('FOOTER.distrinautas'),
          label: this.translate.instant('FOOTER.distrinautas'),
          url: 'http://comunidad.udistrital.edu.co/distrinautas/',
        }, {
          title: this.translate.instant('FOOTER.elecciones'),
          label: this.translate.instant('FOOTER.elecciones_nombre'),
          url: 'http://comunidad.udistrital.edu.co/elecciones/',
        }, {
          title: this.translate.instant('FOOTER.transparencia'),
          label: this.translate.instant('FOOTER.transparencia'),
          url: 'https://www.udistrital.edu.co/transparencia',
        }, {
          title: this.translate.instant('FOOTER.sga'),
          label: this.translate.instant('FOOTER.sga'),
          url: 'http://comunidad.udistrital.edu.co/piga/',
        }, {
          title: this.translate.instant('FOOTER.reforma'),
          label: this.translate.instant('FOOTER.reforma_nombre'),
          url: 'http://comunidad.udistrital.edu.co/reformaud/',
        }, {
          title: this.translate.instant('FOOTER.hora_legal'),
          label: this.translate.instant('FOOTER.hora_legal') + '	',
          url: 'http://horalegal.inm.gov.co/',
        }],
      };
      this.contactenos = {
        title: this.translate.instant('FOOTER.contactenos'),
        datos: [{
          dato: this.translate.instant('FOOTER.direccion'),
          title: this.translate.instant('FOOTER.direccion'),
          url: 'https://www.google.com.co/maps/place/Cra.+7+%2340b-53,+Bogot%C3%A1/@4.6280856,-74.0674698,17z/' +
          'data=!3m1!4b1!4m5!3m4!1s0x8e3f9a287591013f:0x5cce5fbab6b77b9b!8m2!3d4.6280856!4d-74.0652811?hl=es',
        }, {
          dato: this.translate.instant('FOOTER.lugar'),
        }, {
          label: this.translate.instant('FOOTER.codigo_postal'),
          dato: '11021 - 110231588',
        }, {
          dato: '(+57 1) 3239300',
          title: this.translate.instant('FOOTER.centro_relevo'),
          url: 'http://www.centroderelevo.gov.co/632/w3-channel.html',
        }, {
          dato: '01 - 8000 - 914410',
          title: this.translate.instant('FOOTER.centro_relevo'),
          url: 'http://www.centroderelevo.gov.co/632/w3-channel.html',
        }, {
          label: this.translate.instant('FOOTER.atencion_ciudadano') + ' - ' +
            this.translate.instant('FOOTER.centro_relevo'),
          dato: '(+57 1) 3238314',
          title: this.translate.instant('FOOTER.centro_relevo'),
          url: 'http://www.centroderelevo.gov.co/632/w3-channel.html',
        }, {
          label: this.translate.instant('FOOTER.atencion_ciudadano'),
          dato: 'atencion@udistrital.edu.co',
          title: this.translate.instant('FOOTER.atencion_ciudadano'),
          url: 'mailto:atencion@udistrital.edu.co',
        }, {
          label: this.translate.instant('FOOTER.notificacion_judicial'),
          dato: 'notificacionjudicial@udistrital.edu.co',
          title: this.translate.instant('FOOTER.notificacion_judicial'),
          url: 'mailto:notificacionjudicial@udistrital.edu.co',
        }, {
          dato: this.translate.instant('FOOTER.directorio'),
          title: this.translate.instant('FOOTER.directorio'),
          url: 'https://www.udistrital.edu.co/directorio',
        }, {
          dato: this.translate.instant('FOOTER.horario'),
        }],
      };
      this.social = {
        list: [{
          url: 'https://www.facebook.com/UniversidadDistrital',
          title: 'Facebook',
          class: 'facebook',
        }, {
          url: 'https://twitter.com/udistrital',
          title: 'Twitter',
          class: 'twitter',
        }, {
          url: 'https://www.instagram.com/universidaddistrital/',
          title: 'Instagram',
          class: 'instagram',
        }, {
          url: 'https://www.youtube.com/udistritaltv',
          title: 'Youtube',
          class: 'youtube',
        }],
      }
      this.copyright =  this.translate.instant('FOOTER.copyright');
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
