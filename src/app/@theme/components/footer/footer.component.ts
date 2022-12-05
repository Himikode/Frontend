import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a target="_BLANK" href="https://himikode.com" target="_blank">Himikode</a></b> 2022
    </span>
  `,
})
export class FooterComponent {
}
