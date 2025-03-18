export default class CenaJogo extends Phaser.Scene {
    constructor() {
        super({
            key: 'CenaJogo'
        });
        this.score = 0;
    }

    preload() {
        this.load.image('tiles', 'img/tiles_path.png');
        this.load.tilemapTiledJSON('map', './gameMap.json');
        this.load.image('gameBg', 'img/background.png');
        this.load.spritesheet('spritesheet', 'img/spritesheet.png', { frameWidth: 128, frameHeight: 128 });
        this.load.image('blood', 'img/blood.png');
        this.load.audio('jogoMusic', 'sons/jogo_music.mp3');
    }

    create() {
        const { width, height } = this.sys.game.config;
        this.add.image(width / 2, height / 2, 'gameBg').setDisplaySize(width, height);

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tiles_path', 'tiles');
        const Blocos = map.createLayer('Blocos', tileset, -10, 100).setScale(0.8);

        Blocos.setCollisionByExclusion(-1);

        this.player = this.physics.add.sprite(300, 170, 'spritesheet');
        this.player.setGravityY(350);
        this.player.setSize(70, 64);
        this.player.setOffset(40, 60);
        this.physics.add.collider(this.player, Blocos);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('spritesheet', { start: 0, end: 7 }),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('spritesheet', { start: 11, end: 19 }),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('spritesheet', { start: 23, end: 31 }),
            frameRate: 10,
            repeat: 1
        });

        this.teclado = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        const randomX = Phaser.Math.Between(0, width);
        this.blood = this.physics.add.image(randomX, 0, 'blood').setScale(0.2);
        this.blood.setGravityY(300);

        this.physics.add.overlap(this.player, this.blood, this.collectBlood, null, this);

        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        this.jogoMusic = this.sound.add('jogoMusic');
        this.jogoMusic.play({ loop: true, volume: 0.5 });
    }

    collectBlood(player, blood) {
        blood.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
        this.time.delayedCall(2000, () => {
            const { width } = this.sys.game.config;
            const randomX = Phaser.Math.Between(0, width);
            blood.setPosition(randomX, 0);
            blood.setVelocity(0, 0);
            blood.enableBody(false, randomX, 0, true, true);
        }, [], this);
    }

    update() {
        if (this.teclado.left.isDown) {
            this.player.setVelocityX(-150);
            if (this.player.body.onFloor()) {
                this.player.anims.play('run', true);
            }
            this.player.flipX = true;
            this.player.setOffset(24, 60);
        } else if (this.teclado.right.isDown) {
            this.player.setVelocityX(150);
            if (this.player.body.onFloor()) {
                this.player.anims.play('run', true);
            }
            this.player.flipX = false;
            this.player.setOffset(40, 60);
        } else {
            this.player.setVelocityX(0);
            if (this.player.body.onFloor()) {
                this.player.anims.play('idle', true);
            }
        }

        if (this.teclado.space.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-250);
        }

        if (!this.player.body.onFloor()) {
            this.player.anims.play('jump', true);
        }

        if (this.player.x < 0 || this.player.x > this.sys.game.config.width || this.player.y < 0 || this.player.y > this.sys.game.config.height) {
            this.player.setPosition(300, 170);
        }

        if (this.blood.y > this.sys.game.config.height) {
            const { width } = this.sys.game.config;
            const randomX = Phaser.Math.Between(0, width);
            this.blood.setPosition(randomX, 0);
            this.blood.setVelocity(0, 0);
        }
    }
}