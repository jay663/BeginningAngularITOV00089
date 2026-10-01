import { Directive, input } from '@angular/core';
import { Trail } from './types';
type Difficulty = Trail['difficulty'];
@Directive({
  selector: '[appWithDifficulty]',
  host: {
    '[class.text-success]': 'appWithDifficulty() === "easy"',
    '[class.text-info]': 'appWithDifficulty() === "moderate"',
    '[class.text-warning]': 'appWithDifficulty() === "hard"',
    '[class.text-error]': 'appWithDifficulty() === "extreme"',
  },
})
export class WithDifficultyDirective {
  appWithDifficulty = input.required<Difficulty>();
}
