import {Component, OnInit} from 'angular2/core';
import {IPlayerTurn} from './game.models';

@Component({
    selector: 'game',
    templateUrl: 'app/game/game.component.html',
    styleUrls: ['app/game/game.component.css'],
    directives: []
})


export class GameComponent implements OnInit {
    game: Phaser.Game;
    map: Phaser.Tilemap;
    tileLayer: Phaser.TilemapLayer;
    marker: Phaser.Graphics;
    levelData: any;
    timer: Phaser.Timer;
    flippedTileCounter: number = 0;
    flipFlag: boolean = false;
    playerTurn: IPlayerTurn;

    constructor() {
        this.game = new Phaser.Game(900, 600, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    };

    // flipBack = () => {
    //     console.log('flipOver');
    //     this.flipFlag = false;
    //     if (!this.firstFlippedTile.isMatched && !this.secondFlippedTile.isMatched) {
    //         this.map.putTile(36, this.firstFlippedTile.x, this.firstFlippedTile.y);
    //         this.map.putTile(36, this.secondFlippedTile.x, this.secondFlippedTile.y);
    //     }
    //     this.flippedTileCounter = 0;
    //     this.firstFlippedTile = {};
    //     this.secondFlippedTile = {};
    //     this.game.input.mouse.enabled = true;
    //     this.timer.stop();
    // };

    onTap = (pointer: any, tap: any) => {
        console.log('onTap: ');
        this.timer = this.game.time.create(true);
        this.flippedTileCounter++;
        let tappedPosition = ((this.tileLayer.getTileY(this.game.input.activePointer.worldY) + 1) * 6) - (6 - (this.tileLayer.getTileX(this.game.input.activePointer.worldX) + 1));
        console.log('tapPosition: ', tappedPosition);

    };

    preload = () => {
        console.log('preload: ');
        this.game.load.text('level_data', 'app/game/game.assets/level_data.json');
        this.game.load.tilemap('matching', 'app/game/game.assets/matching.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'app/game/game.assets/adventure_time.png');
        this.game.load.image('cover', 'app/game/game.assets/question_mark.png');
    };

    create = () => {
        console.log('create: ');
        this.levelData = JSON.parse(this.game.cache.getText('level_data'));
        this.map = this.game.add.tilemap('matching');
        this.map.addTilesetImage('adventure_time', 'tiles');
        this.tileLayer = this.map.createLayer('TileLayer1');

        for (let col = 0; col < 6; col++) {
            for (let row = 0; row < 6; row++) {
                this.map.putTile(35, col, row);
            }
        }

        this.marker = this.game.add.graphics(0, 0);
        this.marker.lineStyle(2, 0x00FF00, 1);
        this.marker.drawRect(0, 0, 100, 100);
        this.game.input.mouse.capture = true;
        this.game.input.onTap.add(this.onTap, this);
    };

    update = () => {
        if (this.tileLayer.getTileX(this.game.input.activePointer.worldX) <= 5) {
            this.marker.x = this.tileLayer.getTileX(this.game.input.activePointer.worldX) * 100;
            this.marker.y = this.tileLayer.getTileY(this.game.input.activePointer.worldY) * 100;
        }
    };

    render = () => {
        // console.log('render: ');
    };

    ngOnInit() {
        //
    };

}
