import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Broom } from '../icons/broom';
import { Bug } from '../icons/bug';
import { Cake } from '../icons/cake';

@Component({
  imports: [Bug, Cake, Broom, RouterLink, RouterLinkActive],
  selector: 'app-page-header',
  styleUrl: './page-header.css',
  templateUrl: './page-header.html',
})
export class PageHeader {}
