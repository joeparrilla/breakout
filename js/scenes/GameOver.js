export class GameOver extends Phaser.Scene {
 
    constructor() { super('GameOver'); }
 
    preload() {
        
 
    }
 
    create() {
        
        this.input.keyboard.on('keydown-ESC', () => { this.scene.switch('MainMenu') });
        this.createEntries();
        this.setupEventHandlers();
        
    }
 
    createEntries() {
        let style  = { fontFamily: 'Arial', fontSize: 50, color: '#00ff00' },
            coords = [ {x: 250, y: 250} ],
            text   = [ 'Game Over' ];
 
        for (let key in text) {
            let x          = coords[key].x,
                y          = coords[key].y,
                theText    = text[key],
                textObject = this.add.text(x, y, theText, style);
 
            textObject.setStroke('#de77ae', 8);
            textObject.setShadow(2, 2, "#333333", 2, true, true);
            
            textObject.setInteractive(new Phaser.Geom.Rectangle(0, 0, textObject.width, textObject.height), Phaser.Geom.Rectangle.Contains);
           
        }
    }
 
    setupEventHandlers() {

        this.input.on('gameobjectover', (pointer, gameObject) => {
            gameObject.setTint(0xff0000, 0xff0000, 0xffff00, 0xff00ff);
        });

        this.input.on('gameobjectout', (pointer, gameObject) => {

            gameObject.clearTint();
    
        });

    }
 
    update() {

    }
 
};