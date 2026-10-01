import { Component, inject } from '@angular/core';
import { TrailsStore } from './trails-store';

@Component({
  selector: 'app-trails-list-table',
  imports: [],
  template: `
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Miles</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          @for (t of store.trails(); track t.id; let isEven = $even) {
            <tr [class.bg-red-500]="isEven">
              <th>{{ $index + 1 }}</th>
              <td>{{ t.name }}</td>
              <td>{{ t.miles }}</td>
              <td>{{ t.difficulty }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class TrailList {
  protected readonly store = inject(TrailsStore);
}
