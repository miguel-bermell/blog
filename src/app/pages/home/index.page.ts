import { Component } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslocoDirective],
  template: `
    <ng-container *transloco="let t; read: 'home'">
      <section class="max-w-4xl mx-auto">
        <h1>{{ t('welcomeTitle') }}</h1>

        <p class="mt-4">
          {{ t('intro') }} {{ t('in') }}
          <span class="font-semibold text-yellow-400">JavaScript</span>
          {{ t('and') }}
          <span class="font-semibold text-blue-600">TypeScript</span>.
          {{ t('freeTime') }}
        </p>

        <p class="mt-2">
          {{ t('gamingHistory') }}
        </p>

        <p class="mt-2">
          {{ t('professionalFocus') }}
        </p>

        <p class="mt-2">
          {{ t('blog') }}
        </p>
      </section>
    </ng-container>
  `,
  styles: [],
})
export default class HomeComponent {}
