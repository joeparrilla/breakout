import { constants } from '../constants.js'

export class PlayGame extends Phaser.Scene {
    constructor() { super('PlayGame'); }

    preload() {
        this.load.image('paddle1', 'assets/sprites/paddle.png');
        this.load.image('ball', 'assets/sprites/ball.png');
        this.load.image('brick', 'assets/sprites/brick.png');

        this.load.audio('mainloop', 'assets/audio/mainmusicloop.wav');
        this.load.audio('ballhit', 'assets/audio/ballhit.wav');
    }

    create() {

        var lvl1Grid = [[1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1]];

        //music
        var music        = this.sound.add('mainloop');
        var ballHitSound = this.sound.add('ballhit');

        this.ballHitSound = ballHitSound;


        music.play({ loop: true, volume: .25 });

        let cursors = this.input.keyboard.createCursorKeys(),
            paddle1 = this.physics.add.sprite(game.canvas.width / 2, game.canvas.height, 'paddle1'),
            ball    = this.physics.add.sprite(game.canvas.width / 2, game.canvas.height / 2, 'ball').setBounce(1),
            objects = [paddle1, ball];

        for (let key in objects) {
            objects[key].setCollideWorldBounds(true);
        }

        this.cursors = cursors;
        this.paddle1 = paddle1;
        this.ball    = ball;


        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.switch('MainMenu');
            music.pause();
        });

        this.events.on('wake', () => { music.resume(); })

        
        //brick init
        var brickGroup = this.physics.add.staticGroup();
        var xs = 100;
        var ys = 100;

        for (var i = 0; i < lvl1Grid.length; i++) {
            ys += constants.brickSpacingY;
            xs = 100;
            for (var j = 0; j < lvl1Grid[i].length; j++) {
                if (lvl1Grid[i][j] == 1) {
                    xs += constants.brickSpacingX;
                    brickGroup.create(xs, ys, 'brick');
                    
                }
            }
        }
        this.physics.add.collider(brickGroup, ball, (ball, brick) => {
            brick.destroy();
            if (brickGroup.children.entries.length == 0) {
                alert('GAME OVER');
            }
        });

        //Set colliders
        this.physics.add.collider(ball, paddle1, (ball, paddle1) => {
            ballHitSound.play();
            ball.setVelocityX(paddle1.body.velocity.x > 0 ? ball.body.velocity.x + 100 : ball.body.velocity.x - 100);
            ball.setVelocityY(-this.ballVY);
        }, null, this);


        //set ball speed
        this.ballVX = 0;
        this.ballVY = 400;

        this.ball.setVelocity(this.ballVX, this.ballVY);

    }

    update() {
        let left            = this.cursors.left.isDown,
            right           = this.cursors.right.isDown,
            paddle1Speed    = constants.paddle1Speed,
            paddle1Velocity = (right - left) * paddle1Speed;

        this.paddle1.setVelocityX(paddle1Velocity);


        //left/right check for sound
        if ((this.ball.body.x + this.ball.body.width) >= game.canvas.width) {
            this.ballHitSound.play();
        }
        else if (this.ball.body.x <= 0) {
            this.ballHitSound.play();
        }
    }

    checkGameOver() {
        if (this.paddle1Score == constants.winScore) {
            this.scene.switch('GameOver');
        }
    }

};