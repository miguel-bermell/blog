import { DatePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@ngneat/transloco';
import { DateComponent } from './date.component';
import { SvgBookComponent } from './svg/svg-book.component';
@Component({
  selector: 'mb-post-info',
  standalone: true,
  imports: [DatePipe, DateComponent, SvgBookComponent],
  template: `
    <small class="block mb-[-3px]">Miguel García Bermell</small>
    <small class="flex flex-row items-center">
      <svg-book class="w-4 h-4 mr-2" /> 
      {{ readingTime() }} min <span class="mx-1">-</span>
      <mb-date [date]="date()" />
    </small>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class PostInfoComponent {
  constructor() {
    inject(TranslocoService).langChanges$
      .pipe(takeUntilDestroyed())
      .subscribe((currentLang: string) => {
        this.currentLang.set(currentLang);
      });
  }
  public currentLang = signal('es')
  
  readingTime = input<number>();
  date = input<string>();
}
