import {Component} from 'angular2/core';
import StateMonitor from './statemonitor';
import StringifyPipe from './stringify';
import StateStore from '../store/statestore';

@Component({
  selector: 'state-list',
  templateUrl: 'app/matching/devtools/statelist.html',
  styleUrls: ['app/matching/devtools/statelist.css'],
  pipes: [StringifyPipe]
})
export default class StateList {
  monitor: StateMonitor;
  store: StateStore;

  constructor(monitor: StateMonitor, store: StateStore) {
    this.monitor = monitor;
    this.store = store;
  }

  logItemClicked(logItem: any) {
    this.store.store.dispatch({
      type: 'ROLLBACK',
      logItem
    });
  }
}
