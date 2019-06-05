import { MenuItem } from './menu-item';

export const MENU_ITEMS: MenuItem[] = [
  {
    title:  'Dashboard',
    icon:  'nb-home',
    link:  '/pages/dashboard',
    home:  true,
    key:  'dashboard',
  },
  {
    title:  'Inscripcion',
    icon:  'nb-compose',
    link:  '/pages/inscripcion',
    key:  'inscripcion',
    children:  [
      {
        title:  'Posgrado',
        link:  '/pages/inscripcion/posgrado',
        key:  'inscripcion_posgrado',
      },
    ],
  },
  {
    title: 'Admision',
    icon: 'nb-compose',
    link: '/pages/procesos_admisiones',
    key: 'procesos_admisiones',
    children: [
      {
        title: 'Lista Admision',
        link: '/pages/procesos_admisiones/estado_admision',
        key: 'estado_admision',
      },
    ],
  },
];

export const MENU_PUBLICO: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
    key: 'dashboard',
  },
  {
    title: 'directorio',
    icon: 'nb-compose',
    url: 'https://www.udistrital.edu.co/directorio',
    home: false,
    key: 'directorio',
  },
  {
    title: 'atencion_usuario',
    icon: 'nb-compose',
    link: '/pages/atencion_usuario',
    home: false,
    key: 'atencion_usuario',
    children: [
      {
        title: 'defensor_ciudadano',
        url: 'https://www.udistrital.edu.co/dependencia/info/374',
        home: false,
        key: 'defensor_ciudadano',
      },
      {
        title: 'espacios_participacion',
        url: 'https://www.udistrital.edu.co/participa',
        home: false,
        key: 'espacios_participacion',
      },
      {
        title: 'sdqs',
        url: 'http://www.bogota.gov.co/sdqs',
        home: false,
        key: 'sdqs',
      },
      {
        title: 'pqrs',
        url: 'http://reclamos.udistrital.edu.co: 8080/documents/66259/771ae463-5e2a-4b7e-9514-bdcafd013f9c',
        home: false,
        key: 'pqrs',
      },
      {
        title: 'notificaciones_judiciales',
        url: 'http://www1.udistrital.edu.co: 8080/web/oficina-asesora-juridica/notificaciones-judiciales',
        home: false,
        key: 'notificaciones_judiciales',
      },
    ],
  },
  {
    title: 'ilud',
    icon: 'nb-compose',
    url: 'http://ilud.udistrital.edu.co/',
    home: false,
    key: 'ilud',
  },
  {
    title: 'facultades',
    icon: 'nb-compose',
    url: 'https://www.udistrital.edu.co/facultades',
    home: false,
    key: 'facultades',
  },
  {
    title: 'programas',
    icon: 'nb-compose',
    link: '/pages/programas',
    home: false,
    key: 'programas',
    children: [
      {
        title: 'programas_pregrado',
        url: 'https://www.udistrital.edu.co/programas_pregrado',
        home: false,
        key: 'programas_pregrado',
      },
      {
        title: 'programas_posgrado',
        url: 'https://www.udistrital.edu.co/programas_posgrado',
        home: false,
        key: 'programas_posgrado',
      },
    ],
  },
  {
    title: 'editorial',
    icon: 'nb-compose',
    url: 'http://editorial.udistrital.edu.co/',
    home: false,
    key: 'editorial',
  },
  {
    title: 'tienda',
    icon: 'nb-compose',
    url: 'http://editorial.udistrital.edu.co/protienda.php',
    home: false,
    key: 'tienda',
  },
  {
    title: 'laud',
    icon: 'nb-compose',
    url: 'http://laud.udistrital.edu.co/node/46',
    home: false,
    key: 'laud',
  },
  {
    title: 'sedes',
    icon: 'nb-compose',
    url: 'https://www.udistrital.edu.co/sedes',
    home: false,
    key: 'sedes',
  },
  {
    title: 'procesos_admisiones',
    icon: 'nb-compose',
    link: '/pages/procesos_admisiones',
    home: false,
    key: 'procesos_admisiones',
    children: [
      {
        title: 'admisiones_pregrado',
        url: 'https://www.udistrital.edu.co/admisiones-pregrado',
        home: false,
        key: 'admisiones_pregrado',
      },
      {
        title: 'admisiones_inscripcion',
        url: 'https://autenticacion.udistrital.edu.co/accountrecoveryendpoint/register.do?callback=https%3A%2F%2Fautenticacion.udistrital.edu.co%3A443%2Fa' +
        'uthenticationendpoint%2Flogin.do%3Fclient_id%3DAcLs_Mb7b3iEntpgIJ5xIxWkRLga%26commonAuthCallerPath%3D%252Foauth2%252Fauthorize%26forceAuth%3Dfals' +
        'e%26nonce%3D01c6b61219cdcae86b1946726e0e56c7%26passiveAuth%3Dfalse%26redirect_uri%3Dhttps%253A%252F%252Fcliente.campusvirtual.udistrital.edu.co%2' +
        '52F%26response_type%3Did_token%2Btoken%26scope%3Dopenid%2Bemail%2Brole%2Bdocumento%26state%3Db52bddaac1b1bdf8af7c6a298d02e490%26state_url%3D%2523' +
        '%252Fpages%252Fdashboard%26tenantDomain%3Dcarbon.super%26sessionDataKey%3D90107bd5-717a-4f58-b36c-b9bea3c04b94%26relyingParty%3DAcLs_Mb7b3iEntpgI' +
        'J5xIxWkRLga%26type%3Doidc%26sp%3Dcampus_cliente_PREPROD%26isSaaSApp%3Dfalse%26authenticators%3DBasicAuthenticator%3ALOCAL',
        home: false,
        key: 'admisiones_inscripcion',
      },
    ],
  },
  {
    title: 'extension',
    icon: 'nb-compose',
    url: 'http://idexud.udistrital.edu.co/idexud/cursos.php',
    home: false,
    key: 'extension',
  },
  {
    title: 'movilidad_academica',
    icon: 'nb-compose',
    url: 'http://ceri.udistrital.edu.co/',
    home: false,
    key: 'movilidad_academica',
  },
  {
    title: 'convocatorias_academicas',
    icon: 'nb-compose',
    url: 'https://www.udistrital.edu.co/convocatorias-academicas',
    home: false,
    key: 'convocatorias_academicas',
  },
  {
    title: 'sistema_comunicaciones',
    icon: 'nb-compose',
    url: 'https://www.udistrital.edu.co/servicios-comunicaciones',
    home: false,
    key: 'sistema_comunicaciones',
  },
  {
    title: 'investigacion',
    icon: 'nb-compose',
    link: '/pages/investigacion',
    home: false,
    key: 'investigacion',
    children: [
      {
        title: 'cidc',
        url: 'http://cidc.udistrital.edu.co/',
        home: false,
        key: 'cidc',
      },
      {
        title: 'semilleros',
        url: 'http://cidc.udistrital.edu.co/web/index.php/sistemas-de-investigacion/semilleros-de-investigacion',
        home: false,
        key: 'semilleros',
      },
      {
        title: 'grupos_investigacion',
        url: 'http://cidc.udistrital.edu.co/web/index.php/sistemas-de-investigacion/grupos-de-investigacion',
        home: false,
        key: 'grupos_investigacion',
      },
      {
        title: 'revistas_cientificas',
        url: 'http://revistas.udistrital.edu.co/',
        home: false,
        key: 'revistas_cientificas',
      },
      {
        title: 'ieie',
        url: 'http://ieie.udistrital.edu.co/',
        home: false,
        key: 'ieie',
      },
      {
        title: 'rita',
        url: 'https://rita.udistrital.edu.co/',
        home: false,
        key: 'rita',
      },
    ],
  },
];
