import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {provide} from 'angular2/core';
import {gameStates} from './game/game.reducers';
import {createStore, Store} from '@ngrx/store';
import * as devtools from '@ngrx/devtools';
import 'rxjs/Rx';
import AppComponent from './app/app.component';


let enhanced = devtools.instrument()(createStore);

bootstrap(AppComponent, [
  provide(Store, {useValue: enhanced(combineReducers({gameStates})) }),
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
