import { Component } from '@angular/core';
import { MENU_ITEMS } from './andromeda-menu';
import { NbMenuModule } from '@nebular/theme';

@Component({
  selector: 'andromeda-main-menu',
  styleUrls: ['./menu.component.scss'],
  template: `
    <nb-menu [items]="menu"></nb-menu>
  `,
})
export class MenuComponent {
  menu = MENU_ITEMS;
}
