import { Component } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-page-filter-layout>
      <!--<nb-menu [items]="menu"></nb-menu>-->
      <router-outlet></router-outlet>
    </ngx-one-column-page-filter-layout>

  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

}
