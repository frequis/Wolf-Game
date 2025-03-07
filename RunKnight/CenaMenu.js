export default class CenaMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'CenaMenu'
        });
    };

    preload() {
        this.load.image('playBt', 'img/start_bt.png');
        this.load.image('playBg', 'img/bg_menu.png');
        this.load.audio('grito', 'sons/grito.mp3')

    }

    create() {
        const { width, height } = this.sys.game.config;
        this.add.image(width / 2, height / 2, 'playBg').setDisplaySize(width, height);
        const playButton = this.add.image(width / 2, height / 2, 'playBt').setScale(0.3);
        
        const gritoSound = this.sound.add('grito');
        gritoSound.play({ loop: true, volume: 0.5 });

        playButton.setInteractive();
        playButton.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                gritoSound.stop();
                this.scene.start('CenaJogo');
            }
        });
    };

    update() {
        
    };
}