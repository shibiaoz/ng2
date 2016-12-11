// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app.module';

// platformBrowserDynamic().bootstrapModule(AppModule);

import 'core-js/client/shim.min'; // with reflect
import 'zone.js/dist/zone';
 
import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/app/app.module.ngfactory';
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

