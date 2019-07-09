import { constants } from '../constants.js'

export class PlayGame extends Phaser.Scene {
    constructor() { super('PlayGame'); }

    preload() {
        this.load.image('paddle1', 'assets/sprites/paddle.png');
        this.load.image('paddle1Reduced', 'assets/sprites/paddleReduced.png');
        this.load.image('ball', 'assets/sprites/ball.png');
        this.load.image('brickyellow', 'assets/sprites/brickyellow.png');
        this.load.image('brickgreen', 'assets/sprites/brickgreen.png');
        this.load.image('brickorange', 'assets/sprites/brickorange.png');
        this.load.image('brickred', 'assets/sprites/brickred.png');

        this.load.audio('mainloop', 'assets/audio/mainmusicloop.wav');
        this.load.audio('ballhit', 'assets/audio/ballhit.wav');
    }

    create() {

        this.playerLives  = 3;
        this.playerScore  = 0;
        this.ballLaunched = false;
        this.paddleSizeReduced = false;

        //music
        var music        = this.sound.add('mainloop');
        var ballHitSound = this.sound.add('ballhit');

        this.ballHitSound = ballHitSound;

        this.scoreText = this.add.text(0, 0, `score: ${this.playerScore}`, { fontFamily: '"Roboto Condensed"' });
        this.livesText = this.add.text(720, 0, `lives: ${this.playerLives}`, { fontFamily: '"Roboto Condensed"' });

        var lvl1Grid = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]];


        music.play({ loop: true, volume: 0 });

        let cursors = this.input.keyboard.createCursorKeys(),
            paddle1 = this.physics.add.sprite(game.canvas.width / 2, game.canvas.height, 'paddle1'),
            ball    = this.physics.add.sprite(paddle1.body.x, paddle1.body.y - 24, 'ball').setBounce(1),
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

        this.input.keyboard.on('keydown-SPACE', () => {
            this.ballLaunched = true;
            this.ball.body.velocity.y = 400;
        });

        this.paddle1.on('destroy', (paddle1) => {
            this.paddle1
        })

        this.events.on('wake', () => { music.resume(); })


        //brick init
        var brickGroup = this.physics.add.staticGroup();
        var xs         = 32;
        var ys         = 100;

        for (var i = 0; i < lvl1Grid.length; i++) {
            ys += constants.brickSpacingY;
            xs  = 32;
            for (var j = 0; j < lvl1Grid[i].length; j++) {
                if (lvl1Grid[i][j] == 1) {
                    brickGroup.create(xs, ys, 'brickred').setDataEnabled().data.set('type', 4);
                    xs += constants.brickSpacingX;
                }
                else if (lvl1Grid[i][j] == 2) {
                    brickGroup.create(xs, ys, 'brickorange').setDataEnabled().data.set('type', 3)
                    xs += constants.brickSpacingX;
                }
                else if (lvl1Grid[i][j] == 3) {
                    brickGroup.create(xs, ys, 'brickgreen').setDataEnabled().data.set('type', 2);
                    xs += constants.brickSpacingX;
                }
                else if (lvl1Grid[i][j] == 4) {
                    brickGroup.create(xs, ys, 'brickyellow').setDataEnabled().data.set('type', 1);
                    xs += constants.brickSpacingX;
                }
            }
        }
        this.physics.add.collider(brickGroup, ball, (ball, brick) => {
            if (brick.getData('type') == 1) {
                this.playerScore += 1;
            }
            else if (brick.getData('type') == 2) {
                this.playerScore += 3;
            }
            else if (brick.getData('type') == 3) {
                this.playerScore += 5;
            }
            else if (brick.getData('type') == 4) {
                this.playerScore += 7;
            }
                brick.destroy();
            if (brickGroup.children.entries.length == 0) {
                alert('You Win!');
            }
            this.scoreText.text = `score: ${this.playerScore}`;
        });

        //Set colliders
        this.physics.add.collider(ball, paddle1, (ball, paddle1) => {
            ballHitSound.play();
            //check where ball hit
            if (ball.body.x > paddle1.body.x + paddle1.body.width / 1.5) {
                ball.body.velocity.x = 400;
            }
            else if (ball.body.x > paddle1.body.x + paddle1.body.width / 2) {
                ball.body.velocity.x = 200;
            } 
            else if (ball.body.x < paddle1.body.x + paddle1.body.width / 2.5) {
                ball.body.velocity.x = -400;
            }
            else if (ball.body.x < paddle1.body.x + paddle1.body.width / 2) {
                ball.body.velocity.x = -200;
            }
            else {
                ball.body.velocity.x = 0;
            }
            ball.setVelocityY(-this.ballVY);
        }, null, this);


        //set ball speed
        this.ballVX = 0;
        this.ballVY = 400;

        //this.ball.setVelocity(this.ballVX, this.ballVY);

    }

    update() {
        let left            = this.cursors.left.isDown,
            right           = this.cursors.right.isDown,
            paddle1Speed    = constants.paddle1Speed,
            paddle1Velocity = (right - left) * paddle1Speed;

        this.paddle1.setVelocityX(paddle1Velocity);

        if (!this.ballLaunched) {
            this.ball.setX(this.paddle1.body.x + this.paddle1.body.width / 2);
            this.ball.setY(this.paddle1.body.y);
        }


        //left/right check for sound
        if ((this.ball.body.x + this.ball.body.width) >= game.canvas.width) {
            this.ballHitSound.play();
        }
        else if (this.ball.body.x <= 0) {
            this.ballHitSound.play();
        }

        //bottom check for loss
        if (this.ball.body.y + this.ball.body.height >= game.canvas.height) {
            this.playerLives--;
            this.ballLaunched = false;
            this.ball.body.velocity.x = 0;
            this.livesText.text = `lives: ${this.playerLives}`;
            this.checkGameOver();//check for game over
        }

        //upper wall check for paddle decrease
        if (this.ball.body.y <= 0 && !this.paddleSizeReduced) {
            this.paddleSizeReduced = true;
            this.paddle1.setTexture('paddle1Reduced');
            this.paddle1.setDisplaySize(75, 16);
            this.paddle1.setSize(75, 16);
            //this.paddle1.destroy();
            //this.paddle1 = this.physics.add.sprite(game.canvas.width / 2, game.canvas.height, 'paddle1Reduced');
            //this.paddle1.setCollideWorldBounds(true);
        }

        
    }

    checkGameOver() {
        if (this.playerLives == 0) {
            this.scene.switch('GameOver');
        }
    }

};