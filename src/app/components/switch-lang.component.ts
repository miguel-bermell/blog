import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, TemplateRef, Type, ViewChild } from '@angular/core';
import { TranslocoService, TranslocoModule, TranslocoDirective, LangDefinition } from '@ngneat/transloco';
import { SvgFlagUSAComponent } from './svg/svg-flag-us.component';
import { SvgFlagSpainComponent } from './svg/svg-flag-spain.component';
import { CommonModule } from '@angular/common';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'mb-switch-lang',
  standalone: true,
  imports: [CommonModule, TranslocoModule, TranslocoDirective, SvgFlagUSAComponent, SvgFlagSpainComponent],
  template: `
    <span (click)="toggleLanguage()">
      <ng-container
        *ngTemplateOutlet="currentTemplate"
      ></ng-container>
    </span>

    <ng-template #usa>
      <svg-flag-usa class="w-6 h-6" />
    </ng-template>

    <ng-template #spain>
      <svg-flag-spain class="w-6 h-6" />
    </ng-template>
  `,
  styles: ``,
})
export class SwitchLangComponent implements AfterViewInit, OnDestroy {
  translocoService = inject(TranslocoService)
  cdr = inject(ChangeDetectorRef)

  availableLangs = this.translocoService.getAvailableLangs() as LangDefinition[];

  @ViewChild('usa') usaTemplate!: TemplateRef<any>;
  @ViewChild('spain') spainTemplate!: TemplateRef<any>;

  currentTemplate!: TemplateRef<any>;
  private subscription!: Subscription | null;

  ngAfterViewInit(): void {
    console.log({availableLangs: this.availableLangs})
    this.updateFlagTemplate(this.translocoService.getActiveLang());
    this.cdr.detectChanges();
  }

  toggleLanguage(): void {
    this.subscription?.unsubscribe();
    const newLang = this.translocoService.getActiveLang() === 'en' ? 'es' : 'en';

    this.subscription = this.translocoService.load(newLang).pipe(take(1)).subscribe(() => {
      this.translocoService.setActiveLang(newLang);
      this.updateFlagTemplate(newLang);
    });
  }

  private updateFlagTemplate(lang: string): void {
    this.currentTemplate = lang === 'en' ? this.usaTemplate : this.spainTemplate;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
    this.subscription = null
  }
}
