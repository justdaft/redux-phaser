export interface ITile {
    id?: number;
    tileImageId?: number;
    uuid?: any;
    x: number;
    y: number;
    isMatched?: boolean;
    isFlipped?: boolean;
}

export interface IGameStateAction {
    type: string;
    item?: any;
    itemId?: string;
    completed?: boolean;
    turn?: any;
}

export interface IPlayerTurn {
    uuid?: any;
    firstFlippedTile?: ITile;
    secondFlippedTile?: ITile;
    flippedTileCount: number;
}

export interface IGameAction {
  type: string;
  text?: string;
  itemId?: string;
  completed?: boolean;
}
