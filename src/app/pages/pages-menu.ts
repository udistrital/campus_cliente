import { MenuItem } from './menu-item';

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
    key: 'dashboard',
  },
  {
    title: 'Inscripcion',
    icon: 'nb-compose',
    link: '/pages/inscripcion',
    key: 'inscripcion',
    children: [
      {
        title: 'Posgrado',
        link: '/pages/inscripcion/posgrado',
        key: 'inscripcion_posgrado',
      },
    ],
  },
  {
    title: 'Admision',
    icon: 'nb-compose',
    link: '/pages/admision',
    key: 'admision',
    children: [
      {
        title: 'Lista Admision',
        link: '/pages/admision/list-admision',
        key: 'admision',
      },
    ],
  },
  {
    title: 'Tabla Notas',
    icon: 'nb-compose',
    link: '/pages/tabla_notas',
    key: 'tabla_notas',
    children: [
      {
        title: 'Lista Tabla Notas',
        link: '/pages/tabla_notas/list-tabla_notas',
        key: 'lista_tabla_notas',
      },
    ],
  },
  {
    title: 'Comprobante',
    icon: 'nb-compose',
    link: '/pages/comprobante',
    key: 'comprobante',
    children: [
      {
        title: 'Descarga',
        link: '/pages/comprobante/descarga',
        key: 'descarga',
      },
    ],
  },
]
