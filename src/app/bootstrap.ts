import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {provide} from 'angular2/core';

import TodoStore from './store/todostore';
import AppComponent from './app/app.component';
import StateMonitor from './devtools/statemonitor';

bootstrap(AppComponent, [StateMonitor, TodoStore, ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })]);
