import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';


registerLocaleData(localeEs, 'es');
registerLocaleData(localeEn, 'en');

bootstrapApplication(AppComponent, appConfig);
