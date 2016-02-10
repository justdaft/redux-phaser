import {Component} from 'angular2/core';
import StateMonitor from './statemonitor';
import StringifyPipe from './stringify';
import GameStore from '../game/game.store';

@Component({
  selector: 'state-list',
  templateUrl: 'app/devtools/statelist.html',
  styleUrls: ['app/devtools/statelist.css'],
  pipes: [StringifyPipe]
})
export default class StateList {
  monitor: StateMonitor;
  store: GameStore;

  constructor(monitor: StateMonitor, store: GameStore) {
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
