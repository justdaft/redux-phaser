import { List } from 'immutable';
import { GameItem } from './game.models';
import { IGameAction } from './game.models';



export function reducer(state: List<GameItem> = List<GameItem>(), action: IGameAction) {

    function indexOf(uuid: string) {
        return state.findIndex((i: GameItem) => i.uuid === action.itemId);
    }

    switch (action.type) {
        case 'ADD_TILES':
            return state.push(new GameItem().setTiles(action.tiles));
        // case 'ADD':
        //   return state.push(new GameItem().setText(action.text));
        // case 'REMOVE':
        //   return List<GameItem>(state.filter((i: GameItem) => i.uuid !== action.itemId));
        // case 'UPDATE_ITEM_TEXT':
        //   return state.update(indexOf(action.itemId), (i: GameItem) => i.setText(action.text));
        // case 'UPDATE_ITEM_COMPLETION':
        //   return state.update(indexOf(action.itemId), (i: GameItem) => i.setCompleted(action.completed));
        default:
            return state;
    }
}
