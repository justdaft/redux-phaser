import { Injectable } from 'angular2/core';
import { List } from 'immutable';
import { GameItem, IGameAction } from './game.models';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './game.reducer';
import StateMonitor from '../devtools/statemonitor';
import createLogger from 'redux-logger';

@Injectable()
export default class GameStore {
    store: Redux.Store;

    constructor(monitor: StateMonitor) {
        const storedItemsString = <string>localStorage.getItem('gamelist') || '[]';
        const storedItems = <Array<any>>JSON.parse(storedItemsString);
        const items = List<GameItem>(storedItems.map(i => new GameItem(i._data)));
        const logger = createLogger();
        const creator = applyMiddleware(
            monitor.middleware(),
            logger
        )(createStore);
        this.store = creator(monitor.reducer(reducer), items);

        this.store.subscribe(() => {
            localStorage.setItem('gamelist', JSON.stringify(this.items.toJS()));
        });
    }

    get items(): List<GameItem> {
        return this.store.getState();
    }

    dispatch(action: IGameAction) {
        this.store.dispatch(action);
    }
}
