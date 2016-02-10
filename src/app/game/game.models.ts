import { Map } from 'immutable';

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
    tiles?: any;
}

export interface IGameItem {
    tiles: any;
    uuid: any;
    playerName: string;
    tilePairsMatched: number;
    turnsTaken: number;
    dateCreated: any;
}

export class GameItem {
    _data: Map<string, any>;

    get uuid() {
        return <string>this._data.get('uuid');
    }
    
    get playerName() {
        return <string>this._data.get('playerName');
    }
    setPlayerName(value: string) {
        return new GameItem(this._data.set('playerName', value));
    }

    get tilePairsMatched() {
        return <number>this._data.get('tilePairsMatched');
    }
    setTilePairsMatched(value: number) {
        return new GameItem(this._data.set('tilePairsMatched', value));
    }

    get turnsTaken() {
        return <number>this._data.get('turnsTaken');
    }
    setTurnsTaken(value: number) {
        return new GameItem(this._data.set('turnsTaken', value));
    }

    get tiles() {
        return <any>this._data.get('tiles');
    }
    setTiles(value: any) {
        return new GameItem(this._data.set('tiles', value));
    }
    
        get dateCreated() {
        return <any>this._data.get('dateCreated');
    }

    setDateCreated(value: any) {
        return new GameItem(this._data.set('dateCreated', value));
    }

    // get text() {
    //     return <string>this._data.get('text');
    // }

    // setText(value: string) {
    //     return new GameItem(this._data.set('text', value));
    // }

    constructor(data: any = undefined) {
        data = data || {
            tiles: [],
            playerName: 'Neo',
            tilePairsMatched: 0,
            turnsTaken: 0,
            uuid: uuid.v4(),
            dateCreated: new Date()
        };
        this._data = Map<string, any>(data);
    }
}

