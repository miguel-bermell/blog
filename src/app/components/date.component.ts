import { DatePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'mb-date',
  standalone: true,
  imports: [DatePipe],
  template: `
      <span class="text-[var(--primary)] py-0">
        {{ date() | date: 'longDate':undefined:currentLang() }}
      </span>
  `,
  styles: `
  `,
})
export class DateComponent {
  constructor() {
    inject(TranslocoService).langChanges$
      .pipe(takeUntilDestroyed())
      .subscribe((currentLang: string) => {
        this.currentLang.set(currentLang);
      });
  }
  public currentLang = signal('en')
  date = input<string>();
}
