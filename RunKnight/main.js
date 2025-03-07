import CenaMenu from './CenaMenu.js'
import CenaJogo from './CenaJogo.js'

const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100}
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