import { List } from 'immutable';
import { StateItem } from './stateitem';
import { ITile, IGameStateAction } from '../matching.game.models';

export function reducer(state: List<StateItem> = List<StateItem>(), action: IGameStateAction) {

    function indexOf(uuid: string) {
        return state.findIndex((i: StateItem) => i.uuid === action.itemId);
    }

    switch (action.type) {
        case 'ADD':
            return state.push(new StateItem().setItem(action.item));
        case 'REMOVE':
            return List<StateItem>(state.filter((i: StateItem) => i.uuid !== action.itemId));
        case 'CREATE_NEW_GAME': 
            return  ;
        case 'UPDATE_TILE':
            return ;
        // case 'UPDATE_ITEM_TEXT':
        //   return state.update(indexOf(action.itemId), (i: TodoItem) => i.setText(action.item));
        // case 'UPDATE_ITEM_COMPLETION':
        //   return state.update(indexOf(action.itemId), (i: TodoItem) => i.setCompleted(action.completed));
        default:
            return state;
    }
}
