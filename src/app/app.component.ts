import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <main class="flex flex-col min-h-screen">
      <mb-header />
      <section class="grow">
        <router-outlet />
      </section>
      <mb-footer />
    </main>
  `
})
export class AppComponent {
  constructor() {
    registerLocaleData(localeEs, 'es');
    registerLocaleData(localeEn, 'en');
  }
}
