import {Component, OnInit} from 'angular2/core';

@Component({
    selector: 'game',
    templateUrl: 'app/game/game.component.html',
    styleUrls: ['app/game/game.component.css'],
    directives: []
})

export class GameComponent implements OnInit {
    game: Phaser.Game;

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
    };

    create = () => {
        console.log('create: ');
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
