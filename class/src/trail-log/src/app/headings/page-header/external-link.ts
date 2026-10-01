import { Component, input } from '@angular/core';
import { ExternalHyperlink } from './types';
import { ExternalLink } from '../../widgets/icons/external-link';

@Component({
  selector: 'app-external-link-item',
  imports: [ExternalLink],
  template: `
    <li>
      @let ln = link();
      <a [href]="ln.href" target="_blank">{{ ln.linkText }} <app-external-link /></a>
    </li>
  `,
  styles: ``,
})
export class ExternalLinkItem {
  link = input.required<ExternalHyperlink>();
}
