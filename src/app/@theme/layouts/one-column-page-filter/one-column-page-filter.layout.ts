import { Component } from '@angular/core';

@Component({
  selector: 'ngx-one-column-page-filter-layout',
  styleUrls: ['./one-column-page-filter.layout.scss'],
  template: `
    <nb-layout windowMode>

      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-layout-header fixed subheader class="andromeda-page-filter">
        <andromeda-page-filter></andromeda-page-filter>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <andromeda-main-menu></andromeda-main-menu>

        <nb-sidebar-footer>
          <!--<andromeda-logged-user></andromeda-logged-user>-->
        </nb-sidebar-footer>

      </nb-sidebar>

      <nb-layout-column>
        <div class="one-column-page-filter-inner">
          <ng-content select="router-outlet"></ng-content>
        </div>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
      
    </nb-layout>
  `,
})
export class OneColumnPageFilterLayoutComponent {
}