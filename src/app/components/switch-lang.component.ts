import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  NgZone,
  TemplateRef
} from '@angular/core';
import {
  TranslocoDirective,
  TranslocoModule,
  TranslocoService
} from '@ngneat/transloco';
import { SvgFlagSpainComponent } from './svg/svg-flag-spain.component';
import { SvgFlagUKComponent } from './svg/svg-flag-uk.component';
@Component({
  selector: 'mb-switch-lang',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    SvgFlagUKComponent,
    SvgFlagSpainComponent,
  ],
  template: `
    <div class="relative w-6 h-6" (click)="toggleLanguage()">
      <div
        class="absolute inset-0 transition-opacity duration-700"
        [ngClass]="{
          'opacity-100': currentLang === 'en',
          'opacity-0': currentLang !== 'en'
        }"
      >
        <svg-flag-uk class="w-6 h-6" />
      </div>
      <div
        class="absolute inset-0 transition-opacity duration-700"
        [ngClass]="{
          'opacity-100': currentLang === 'es',
          'opacity-0': currentLang !== 'es'
        }"
      >
        <svg-flag-spain class="w-6 h-6" />
      </div>
    </div>
  `,
  styles: ``,
})
export class SwitchLangComponent {
  private ngZone = inject(NgZone);
  private translocoService = inject(TranslocoService);

  currentLang: string = this.translocoService.getActiveLang();

  toggleLanguage(): void {
    const newLang = this.currentLang === 'en' ? 'es' : 'en';
    this.ngZone.run(() => {
      this.translocoService.setActiveLang(newLang);
      this.currentLang = newLang;
    });
  }
}
