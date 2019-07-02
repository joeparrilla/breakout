export class OptionsMenu extends Phaser.Scene {
 
    constructor() { super('OptionsMenu'); }
 
    preload() {
        
 
    }
 
    create() {
        
        this.input.keyboard.on('keydown-ESC', () => { this.scene.switch('MainMenu') });
        this.createEntries();
        this.setupEventHandlers();

        this.difficulty = 2;
        
    }
 
    createEntries() {
        let style       = { fontFamily: 'Arial', fontSize: 50, color: '#00ff00' },
            coords      = [ {x:75, y: 180}, {x:75, y: 280}, {x:75, y: 380}, {x:350, y: 380}, {x:500, y: 380}, {x:640, y: 380} ],
            text        = [ 'Setting 1', 'Volume:', 'Difficulty:', 'Easy', 'Med', 'Hard' ],
            interactive = [ 'Easy', 'Med', 'Hard' ];
 
        for (let key in text) {
            let x          = coords[key].x,
                y          = coords[key].y,
                theText    = text[key],
                textObject = this.add.text(x, y, theText, style);
 
            textObject.setStroke('#de77ae', 8);
            textObject.setShadow(2, 2, "#333333", 2, true, true);

            if (interactive.includes(theText)) {
                textObject.setInteractive(new Phaser.Geom.Rectangle(0, 0, textObject.width, textObject.height), Phaser.Geom.Rectangle.Contains);
            }

            //default medium on
            if (theText == 'Med') {
                textObject.setTint(0xff0000, 0xff0000, 0xffff00, 0xff00ff);
            }
            
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