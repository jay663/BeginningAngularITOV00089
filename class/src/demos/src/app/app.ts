import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeader } from './ui-widgets/page-header/page-header';
import { Counter } from './demos/counter';

// "Metadata decorator" "@script"
// [TestMethod], [HttpGet("/lunch")]
@Component({
  imports: [PageHeader, Counter],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
