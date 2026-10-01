import { Directive, effect, ElementRef, inject, input, signal } from '@angular/core';

@Directive({
  selector: 'button[appCounterButton]',
  host: {
    '[class]':
      '{"btn": true, "btn-sm": true, "btn-circle": true, "btn-error": appCounterButton() === "decrement", "btn-success": appCounterButton() === "increment"}',
    '(mouseenter)': 'onHovering()',
    '(mouseleave)': 'onHoverOff()',
    '[class.ring]': 'isHovering()',
    '[class.ring-4]': 'isHovering()',
    '[class.ring-yellow-500]': 'isHovering()',
  },
})
export class CounterButtonDirective {
  appCounterButton = input<'increment' | 'decrement'>('increment');

  private el = inject(ElementRef<HTMLButtonElement>);
  constructor() {
    // this is not really going to work *yet*
    // effect(() => {
    //   const color = this.appCounterButton() === 'decrement' ? 'btn-error' : 'btn-success';
    //   this.el.nativeElement.classList.add('btn', 'btn-sm', 'btn-circle', color);
    // });
  }

  isHovering = signal(false);

  onHovering() {
    this.isHovering.set(true);
  }
  onHoverOff() {
    this.isHovering.set(false);
  }
}
