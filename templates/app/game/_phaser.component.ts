import {Component, OnInit} from 'angular2/core';

@Component({
    selector: 'game',
    templateUrl: 'app/game/_phaser.component.html',
    styleUrls: ['app/game/_phaser.component.css'],
    directives: []
})

export class Game implements OnInit {
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
        console.log('preload: ')
    }

    create = () => {
        console.log('preload: ')
    }

    update = () => {
        console.log('preload: ')
    }

    render = () => {
        console.log('preload: ')
    }
    
    ngOnInit() {
        //
    };
}