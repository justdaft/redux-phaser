import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {provide} from 'angular2/core';
import {createStore, combineReducers, Store} from '@ngrx/store';
import * as devtools from '@ngrx/devtools';
import {gameStates} from './game/game.reducers';
import 'rxjs/Rx';

import TodoStore from './store/todostore';
import AppComponent from './app/app.component';
import StateMonitor from './devtools/statemonitor';

let enhanced = devtools.instrument()(createStore);

bootstrap(AppComponent, [
  provide(Store, { useValue: enhanced(combineReducers({ gameStates})) }),
  StateMonitor,
  TodoStore,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
