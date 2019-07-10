import {MainMenu} from './scenes/MainMenu.js';
import {PlayGame} from './scenes/PlayGame.js';
import {GameOver} from './scenes/GameOver.js';
import {Pause} from './scenes/Pause.js';
 
///////////////////////////////////////////////////////////////// instantiation
var config = {
    type   : Phaser.AUTO,
    width  : 768,
    height : 600,
    physics: {
        default: 'arcade',
        arcade : {
            debug: false
        }
    },
    scene: [MainMenu, PlayGame, GameOver, Pause]
};
 
self.game = new Phaser.Game(config);