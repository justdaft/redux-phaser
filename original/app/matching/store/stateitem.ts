import { Map } from 'immutable';
import { ITile } from '../matching.game.models';

export class StateItem {
  _data: Map<string, any>;

  get uuid() {
    return <string> this._data.get('uuid');
  }

  get item() {
    return <string> this._data.get('item');
  }

  setItem(value: ITile) {
    return new StateItem(this._data.set('item', value));
  }
  
  

  // get completed() {
  //   return <boolean> this._data.get('completed');
  // }
  //
  // setCompleted(value: boolean) {
  //   return new TodoItem(this._data.set('completed', value));
  // }

  constructor(data: any = undefined) {
    data = data || { text: '', completed: false, uuid: uuid.v4() };
    this._data = Map<string, any>(data);
  }
}
