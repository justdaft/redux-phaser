export interface ITile {
    _id?: number;
    id?: number;    
    tileImageId?: number;
    uuid?: any;
    isMatched?: boolean;
    x?: number;
    y?: number;
    canFlip?: boolean;
    isFlipped?: boolean;
}
export interface IGameStateAction {
    type: string;
    item?: any;
    itemId?: string;
    completed?: boolean;
}
