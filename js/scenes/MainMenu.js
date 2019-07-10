export class MainMenu extends Phaser.Scene {
 
    constructor() { super('MainMenu'); }
 
    preload() {
 
    }
 
    create() {
        this.createEntries();
        this.setupEventHandlers();
    }
 
    createEntries() {
        let style  = { fontFamily: 'Arial', fontSize: 50, color: '#00ff00' },
            coords = [ {x:150, y: 180}, {x:150, y: 280} ],
            text   = [ 'Start Game', 'Exit Game' ];
 
        for (let key in text) {
            let x          = coords[key].x,
                y          = coords[key].y,
                theText    = text[key],
                textObject = this.add.text(x, y, theText, style);
 
            textObject.setStroke('#de77ae', 8);
            textObject.setShadow(2, 2, "#333333", 2, true, true);
            
            textObject.setInteractive(new Phaser.Geom.Rectangle(0, 0, textObject.width, textObject.height), Phaser.Geom.Rectangle.Contains);
            textObject.on('pointerdown', () => {
                if (textObject.text == 'Start Game') {
                    this.scene.switch('PlayGame');
                }
                else if (textObject.text == 'Options') {
                    this.scene.switch('OptionsMenu');
                }
                else if (textObject.text == 'Exit Game') {
                    this.game.destroy(true, true);
                }
            });
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
 
    update() {}
 
};