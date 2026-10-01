import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-counting-area',
  imports: [RouterOutlet, RouterLinkWithHref],
  template: `
    <div class="flex flex-row gap-4">
      <a class="link" routerLink="counter">Counter</a>
      <a class="link" routerLink="prefs">Prefs</a>
    </div>
    <div class="p-4 border-2 border-dashed ">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class Home {}
