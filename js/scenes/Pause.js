export class Pause extends Phaser.Scene {
 
    constructor() { super('Pause'); }
 
    preload() {
        
 
    }
 
    create() {
        
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.sleep();
            this.scene.resume('PlayGame');
        });
        this.createEntries();
        this.cameras.main.alpha = .5;
        
    }
 
    createEntries() {
        let style  = { fontFamily: 'Arial', fontSize: 50, color: '#00ff00' },
            coords = [ {x: 250, y: 250} ],
            text   = [ 'Paused' ];
 
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
 
    update() {

    }
 
};