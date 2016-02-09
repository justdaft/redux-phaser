import {Component, OnInit} from 'angular2/core';

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
    objectLayer: Phaser.TilemapLayer;

    constructor() {
        this.game = new Phaser.Game(900, 600, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    };

    preload = () => {
        console.log('preload: ');
        this.game.load.tilemap('matching', 'app/game/game.assets/matching.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'app/game/game.assets/adventure_time.png');
    };

    create = () => {
        console.log('create: ');
        this.map = this.game.add.tilemap('matching');
        this.map.addTilesetImage('adventure_time', 'tiles');
        this.tileLayer = this.map.createLayer('TileLayer1');
        this.objectLayer = this.map.createLayer('ObjectLayer1');
    };

    update = () => {
        // console.log('update: ');
    };

    render = () => {
        // console.log('render: ');
    };

    ngOnInit() {
        //
    };
}
