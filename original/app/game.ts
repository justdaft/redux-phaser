// Credits to Christian Johansen for game logic:
// https://github.com/cjohansen/react-sweeper

let {List, Map, fromJS} = Immutable;
import {partition, shuffle, repeat, keep, prop} from './util';

function initTiles(rows: number, cols: number) {
    return shuffle(
        repeat((rows * cols) / 2, Map({
            isMatched: true,
            isRevealed: false
        })).concat(repeat((rows * cols) / 2, Map({ isRevealed: false })))).
        map(function(tile: any, idx: any) {
            return tile.set('id', idx);
        });
}

function onWEdge(game: any, tile: any) {
    return tile % game.get('cols') === 0;
}

function onEEdge(game: any, tile: any) {
    return tile % game.get('cols') === game.get('cols') - 1;
}

function idx(game: any, tile: any) {
    if (tile < 0) { return null; }
    return game.getIn(['tiles', tile]) ? tile : null;
}


function isMine(game: any, tile: any) {
    return game.getIn(['tiles', tile, 'isMine']);
}

function isSafe(game: any) {
    const tiles = game.get('tiles');
    const mines = tiles.filter(prop('isMine'));
    return mines.filter(prop('isRevealed')) === 0 &&
        tiles.length - mines.length === tiles.filter(prop('isRevealed')).length;
}

export function isGameOver(game: any) {
    return isSafe(game) || game.get('isDead');
}


function attemptWinning(game: any) {
    return isSafe(game) ? game.set('isSafe', true) : game;
}

function revealMine(tile: any) {
    return tile.get('isMine') ? tile.set('isRevealed', true) : tile;
}

function revealMines(game: any) {
    return game.updateIn(['tiles'], function(tiles: any) {
        return tiles.map(revealMine);
    });
}

function revealTile(game: any, tile: any) {
    const updated = !game.getIn(['tiles', tile]) ?
        game : game.setIn(['tiles', tile, 'isRevealed'], true);
    return isMine(updated, tile);
}

function createGame(options: any) {
    return fromJS({
        cols: options.cols,
        rows: options.rows,
        playingTime: 0,
        tiles: initTiles(options.rows, options.cols)
    });
}
