import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {provide} from 'angular2/core';


import AppComponent from './app/app.component';


bootstrap(AppComponent, [ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })]);
