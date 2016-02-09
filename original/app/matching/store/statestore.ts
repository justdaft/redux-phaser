import { Injectable } from 'angular2/core';
import { List } from 'immutable';
import { StateItem } from './stateitem';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducer';
import { IGameStateAction } from '../matching.game.models';
import StateMonitor from '../devtools/statemonitor';

@Injectable()
export default class StateStore {
  store: Redux.Store;

  constructor(monitor: StateMonitor) {
    const storedItemsString = <string> localStorage.getItem('gamestatelist') || '[]';
    const storedItems = <Array<any>> JSON.parse(storedItemsString);
    const items = List<StateItem>(storedItems.map(i => new StateItem(i._data)));

    const creator = applyMiddleware(monitor.middleware())(createStore);
    this.store = creator(monitor.reducer(reducer), items);

    this.store.subscribe(() => {
      localStorage.setItem('gamestatelist', JSON.stringify(this.items.toJS()));
    });
  }

  get items(): List<StateItem> {
    return this.store.getState();
  }

  dispatch(action: IGameStateAction) {
    this.store.dispatch(action);
  }
}
