import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppModule } from './app/view/app.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    // if ('serviceWorker' in navigator && environment.production) {
    //   navigator.serviceWorker.register('/ngsw-worker.js');
    // }
  })
  .catch((err) => console.log(err));
