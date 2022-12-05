import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  

  {
    title: 'Home',
    icon: 'layout-outline',
    link: '/pages/home',
    home: true
  },  
  {
    title: 'DASHBOARDS',
    group: true,
  },
  {
    title: 'Consumo',
    icon: 'grid-outline',
    link: '/pages/dashboards/consumo',
  },
  {
    title: 'Calidad',
    icon: 'star-outline',
    link: '/pages/dashboards/calidad',
  },
  {
    title: 'Activos',
    icon: 'settings-2-outline',
    link: '/pages/dashboards/sat',
  },
  
  {
    title: 'REGISTROS',
    group: true,
  },
  {
    title: 'Cafeteras',
    icon: 'list-outline',
    link: '/pages/registros/cafeteras',
  },
  {
    title: 'Molinos',
    icon: 'menu-2-outline',
    link: '/pages/registros/molinos',
  }
];
