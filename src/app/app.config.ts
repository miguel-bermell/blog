import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { TranslocoHttpLoader } from './transloco-loader';
import { getBrowserLang, provideTransloco } from '@ngneat/transloco';
import { withViewTransitions } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(withViewTransitions()),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideContent(withMarkdownRenderer()),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
        defaultLang: getBrowserLang() ?? 'en',
        fallbackLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
