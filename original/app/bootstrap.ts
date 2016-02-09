import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import StateStore from './matching/store/statestore';
import StateMonitor from './matching/devtools/statemonitor';

bootstrap(AppComponent, [StateStore, StateMonitor]);
