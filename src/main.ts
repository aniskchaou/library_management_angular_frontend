import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Apply persisted display settings as early as possible to avoid flash
try {
  const t = localStorage.getItem('ll.theme');
  const c = localStorage.getItem('ll.primaryColor');
  if (t === 'dark') { document.body.classList.add('ll-theme-dark'); }
  document.documentElement.style.setProperty('--ll-primary', c || '#3f51b5');
} catch (e) { /* ignore */ }

platformBrowserDynamic().bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()], })
  .catch(err => console.error(err));
