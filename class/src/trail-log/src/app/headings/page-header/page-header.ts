import { Component, signal } from '@angular/core';
import { TreeIcon } from '../../widgets/icons/tree-icon';
import { ExternalHyperlink } from './types';
import { ExternalLinkItem } from './external-link';
import { RouterLink } from '@angular/router';

@Component({
  imports: [TreeIcon, ExternalLinkItem, RouterLink],
  selector: 'app-page-header',
  styleUrl: './page-header.css',
  templateUrl: './page-header.html',
})
export class PageHeader {
  protected readonly links = signal<ExternalHyperlink[]>([
    {
      href: 'https://angular.dev',
      linkText: 'Angular Docs',
    },
    {
      href: 'https://class.hypertheory-labs.com',
      linkText: 'Hypertheory Labs',
    },
    {
      href: 'https://typescriptlang.org',
      linkText: 'TypeScript Site',
    },
  ]);
}
