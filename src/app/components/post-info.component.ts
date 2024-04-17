import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'mb-post-info',
  standalone: true,
  imports: [DatePipe],
  template: `
    <small class="block mb-[-8px]">Miguel García Bermell</small>
    <small>
      {{ readingTime() }} min read -
      <span class="text-[var(--primary)] py-0">
        {{ date() | date: 'longDate' }}
      </span>
    </small>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class PostInfoComponent {
  readingTime = input<number>();
  date = input<string>();
}
