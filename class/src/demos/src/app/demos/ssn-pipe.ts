import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ssnHider',
})
export class SsnHiderPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/^\d{3}-\d{2}/, '***-**');
  }
}
