/// <reference path="../../../typings/node-uuid/node-uuid-global.d.ts" />
import { Map } from 'immutable';

export class GameItem {
  _data: Map<string, any>;

  get uuid() {
    return <string> this._data.get('uuid');
  }

  get text() {
    return <string> this._data.get('text');
  }

  setText(value: string) {
    return new GameItem(this._data.set('text', value));
  }

  get completed() {
    return <boolean> this._data.get('completed');
  }

  setCompleted(value: boolean) {
    return new GameItem(this._data.set('completed', value));
  }

  constructor(data: any = undefined) {
    data = data || { text: '', completed: false, uuid: uuid.v4() };
    this._data = Map<string, any>(data);
  }
}
