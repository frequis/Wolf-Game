import CenaMenu from './CenaMenu.js'
import CenaJogo from './CenaJogo.js'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
     },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100},
            debug: true
        }
    },
    parent: 'jogo-lobisomem',
    backgroundColor: '#ffffff',
    scene: [
        CenaMenu,
        CenaJogo
    ]
};

const jogo = new Phaser.Game(config);