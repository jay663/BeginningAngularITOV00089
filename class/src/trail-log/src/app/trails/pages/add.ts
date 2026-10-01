import { Component, inject, signal } from '@angular/core';
import { FormField, FormRoot, form, required, min, max, minLength } from '@angular/forms/signals';
import { ApiCreate } from '../types';
import { JsonPipe } from '@angular/common';
import { TrailsStore } from '../trails-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trail-add',
  imports: [FormRoot, FormField, JsonPipe],
  template: `
    <form [formRoot]="form">
      <div class="flex flex-col gap-4">
        <label class="label">
          Name
          <input [formField]="form.name" class="input" type="text" placeholder="Trail Name" />
          @if (form.name().invalid() && (form.name().dirty() || form.name().touched())) {
            <div class="alert alert-error">
              @for (e of form.name().errorSummary(); track $index) {
                <p>{{ e | json }}</p>
              }
            </div>
          }
        </label>
        <label class="label">
          Mile
          <input [formField]="form.miles" class="input" type="number" placeholder="0" />
        </label>
        <label class="label">
          Difficulty
          <input [formField]="form.difficulty" class="input" type="text" placeholder="0" />
        </label>
        <button type="submit" class="btn btn-sm btn-primary">Add Trail</button>
        <a class="btn btn-secondary btn-sm">Cancel</a>
      </div>
    </form>
    <pre>
  {{ model() | json }}

</pre>
  `,
  styles: ``,
})
export class Add {
  protected readonly model = signal<ApiCreate>({
    name: '',
    miles: 0,
    difficulty: 'easy',
  });
  protected readonly store = inject(TrailsStore);
  protected readonly router = inject(Router);
  protected readonly form = form(
    this.model,
    (schema) => {
      required(schema.name, { message: 'We need a name, yo' });
      minLength(schema.name, 3, { message: 'Too short!' });
      required(schema.miles, { message: 'How many miles?' });
      min(schema.miles, 1, { message: 'less than that is silly' });
      max(schema.miles, 99);
    },
    {
      submission: {
        action: async (field) => {
          await this.store.addTrail(this.model());

          this.form().reset();
          this.router.navigate(['..']);
        },
      },
    },
  );
}
