import { IGameAction } from './game.models';

export function addTiles(tiles: any): IGameAction {
  return {
    type: 'ADD_TILES',
    tiles
  };
}

export function addItem(text: string): IGameAction {
  return {
    type: 'ADD',
    text
  };
}

export function removeItem(itemId: string): IGameAction {
  return {
    type: 'REMOVE',
    itemId
  };
}

export function updateItemText(itemId: string, text: string): IGameAction {
  return {
    type: 'UPDATE_ITEM_TEXT',
    itemId,
    text
  };
}

export function updateItemCompletion(itemId: string, completed: boolean): IGameAction {
  return {
    type: 'UPDATE_ITEM_COMPLETION',
    itemId,
    completed
  };
}
