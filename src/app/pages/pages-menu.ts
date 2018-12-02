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
    title: 'Propuesta Grado',
    icon: 'nb-compose',
    link: '/pages/propuesta_grado',
    key: 'propuesta_grado',
    children: [
      {
        title: 'Lista Propuesta Grado',
        link: '/pages/propuesta_grado/list-propuesta_grado',
        key: 'lista_propuesta_grado',
      },
      {
        title: 'CRUD Propuesta Grado',
        link: '/pages/propuesta_grado/crud-propuesta_grado',
        key: 'crud_propuesta_grado',
      },
    ],
  },
  {
    title: 'Tipo Proyecto',
    icon: 'nb-compose',
    link: '/pages/tipo_proyecto',
    key: 'tipo_proyecto',
    children: [
      {
        title: 'Lista Tipo Proyecto',
        link: '/pages/tipo_proyecto/list-tipo_proyecto',
        key: 'lista_tipo_proyecto',
      },
      {
        title: 'CRUD Tipo Proyecto',
        link: '/pages/tipo_proyecto/crud-tipo_proyecto',
        key: 'crud_tipo_proyecto',
      },
    ],
  },
]
