import {MainMenu} from './scenes/MainMenu.js';
import {OptionsMenu} from './scenes/OptionsMenu.js';
import {PlayGame} from './scenes/PlayGame.js';
import {GameOver} from './scenes/GameOver.js';
 
///////////////////////////////////////////////////////////////// instantiation
var config = {
    type   : Phaser.AUTO,
    width  : 800,
    height : 800,
    physics: {
        default: 'arcade',
        arcade : {
            debug: false
        }
    },
    scene: PlayGame//[MainMenu, PlayGame, OptionsMenu, GameOver]
};
 
self.game = new Phaser.Game(config);