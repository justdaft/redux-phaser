
export class Fazer {
    game: Phaser.Game;
    sprite: any;
    constructor() {
        this.game = new Phaser.Game(800, 800, Phaser.AUTO, 'content', {
            create: this.create,
            preload: this.preload,
            update: this.update,
            render: this.render
        });
    }

    preload() {
        this.game.load.image('pic', 'app/assets/phaser-logo-small.png');
    }

    create() {
        this.game.stage.backgroundColor = 0x5d5d5d;
        this.sprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'pic');
        this.sprite.anchor.setTo(0.5, 0.5);
    }

    update() {
        this.sprite.angle += 1;
    }

    render() {
        this.game.debug.spriteInfo(this.sprite, 32, 32);
    }
}
