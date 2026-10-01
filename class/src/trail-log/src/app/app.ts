import { Component } from '@angular/core';
import { PageHeader } from './headings/page-header/page-header';

import { TrailList } from './trails/trails-list';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [PageHeader, TrailList, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
