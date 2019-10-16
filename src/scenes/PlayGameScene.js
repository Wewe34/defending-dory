/* eslint-disable quotes */
/* eslint-disable max-statements */
/* eslint-disable complexity */

import Phaser from "phaser";

export default class PlayGameScene extends Phaser.Scene
{
    constructor () {
        super("Play")
        this.facingRight = true;
        this.score = 0;
        this.finalScoreText = null;
        this.sharkGenLoop = null;
        this.single = null;
        this.chanceOfSurvival = 500;
        this.chanceOfSurvivalText = null;
        this.isGameOver = false;
        this.isGameOverText = null;
        this.timing = null;
        this.mainMenu = null;
        this.playAgainText = null;
        this.restartText = null;
        this.gameIsPaused = false;
    }

    create ()
    {
        //background
        this.add.image(0, 0, 'ocean').setScale(0.5);

        // cursor initiation
        this.cursors = this.input.keyboard.createCursorKeys();


        // Main Menu add to scene and interactivity
        this.mainMenu = this.add.text(20, 20,
             "MAIN MENU", { font: '20px Optima', fill: '#fff'}).setDepth(5);
        this.mainMenu.setInteractive({ cursor: 'pointer' });
        this.mainMenu.on("pointerup", () => {
            this.gameIsPaused = true;
            this.scene.switch('Menu')
        })

        // Restart add to scene and interactivity
        this.restartText = this.add.text(180, 20,
             "RESTART", { font: '20px Optima', fill: '#fff'}).setDepth(5);
        this.restartText.setInteractive({ cursor: 'pointer' });
        this.restartText.on("pointerup", () => {
            setTimeout(function(){
				location.reload();
			}, 100);
        })

        //Dory's CHANCE OF SURVIVAL text add to scene

       this.chanceOfSurvivalText = this.add.text(this.sys.game.config.width / 2.5, 20,
             `CHANCE OF SURVIVAL:  ${this.chanceOfSurvival}%`, {font: '20px Optima'}).setDepth(5);

        //Scoring add to scene. Increase score every two seconds by 93.

        this.scoreLabel = this.add.text(this.sys.game.config.width - 200, 20,
             `SCORE:  ${this.score}`, {font: '20px Optima'}).setDepth(5);

        if (!this.isGameOver && !this.gameIsPaused) {
            this.timing = setInterval(() => {
                this.score += 93;
            }, 2000)
        }

        //dory create and animate

        this.dory = this.physics.add.sprite(200, 400, 'fish');
        this.dory.setScale(0.2);
        this.dory.body.allowGravity = false;

        this.anims.create({
            key: 'dory-switch',
            frames: this.anims.generateFrameNumbers('fish'),
            frameRate: null,
            repeat: 0,
        });

        this.anims.create({
            key: 'collideLeft',
            frames: this.anims.generateFrameNumbers('collideLeft'),
            frameRate: null,
            repeat: 0,
        });

        this.dory.setCollideWorldBounds(true);


        //dory bubble particle emitter

        this.fishParticles = this.add.particles('bubbleParticle');
        this.bubbleEmitter = this.fishParticles.createEmitter({
            x: 0,
            y: 0,
            speed: 50,
            lifespan: 500,
            frequency: 50,
            quantity: 5,
            gravityX: -300,
            on: false,
            blendMode: 'ADD',
            scale: {start: 0.02, end: 0.02}
        })

        this.bubbleEmitter.startFollow(this.dory);

        //dory blood particle emitter

        this.bloodParticles = this.add.particles('red');
        this.bloodEmitter = this.bloodParticles.createEmitter({
            x: 0,
            y: 0,
            speed: 10,
            lifespan: 3000,
            frequency: 1000,
            quantity: 2,
            gravityY: 180,
            active: true,
            blendMode: 'ADD',
            scale: {start: 0.1, end: 0.1},
            alpha: {start: 1, end: 0},
            delay: 100
        })

        this.bloodEmitter.startFollow(this.dory);

        //sharks created. sharkGenLoop calls the sharkGen function to create a new shark at rate of 800ms

        const sharks = this.physics.add.group();

        function sharkGen () {
        const yCoord = Math.random() * window.innerHeight;
        this.single = sharks.create(window.innerWidth + 150, yCoord, 'sharkFaceLeft').setScale(0.2);
        this.single.body.allowGravity = false;
        this.single.body.velocity.x = -320;
        }

        this.sharkGenLoop = this.time.addEvent({
            delay: 800,
            callback: sharkGen,
            callbackScope: this,
            loop: true
        });

        //add overlap functionality for dory and the sharks. Calls the lifeDeduct function when overlapped

        this.physics.add.overlap(this.dory, sharks, this.lifeDeduct, null, this);


        //When game is over the following is added and removed from scene.
        //Play again text interactivy to reload game.

        this.isGameOverText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2,
             `GAME OVER`, {font: '90px Optima'}).setDepth(5);
        this.finalScoreText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 1.5,
             `FINAL SCORE: ${this.score}`, {font: '60px Optima'}).setDepth(5);
        this.playAgainText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 1.2,
             `PLAY AGAIN`, {font: '40px Optima'}).setDepth(5);
        this.isGameOverText.visible = false;
        this.playAgainText.visible = false;
        this.finalScoreText.visible = false;

        this.playAgainText.setInteractive({ cursor: 'pointer' });

        this.playAgainText.on("pointerup", () => {
            setTimeout(function(){
				location.reload();
			}, 100);
        })

    }

    //Called from the overlap functionality of dory and the sharks.
    // Deducts CHANCE OF SURVIVAL, plays hit sound and dory animation is played to turn her red

    lifeDeduct()
    {
        this.sound.play('sharkHit', {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });
        this.chanceOfSurvival -= 1;
        this.dory.play('collideLeft');
    }


    update ()
    {
        //set condition to only have cursor movement if game is currently in play
        if (!this.isGameOver)
        {
            //left arrow cursor functionality
            if (this.cursors.left.isDown)
            {
                this.dory.x -= 8;
                this.bubbleEmitter.on = true;
                this.bubbleEmitter.gravityX = 300;
                if (this.facingRight) {
                    this.dory.play('dory-switch');
                    this.dory.flipX = false;
                    this.facingRight = false;
                }
            }
            //right arrow cursor functionality
            else if (this.cursors.right.isDown)
            {
                this.dory.x += 8;
                this.bubbleEmitter.on = true;
                this.bubbleEmitter.gravityX = -300;
                if (!this.facingRight) {
                    this.dory.play('dory-switch');
                    this.dory.flipX = true;
                    this.facingRight = true;
                }

            }
            else {
            //bubble emitter only on if left and right arrow cursors are pressed down
                this.bubbleEmitter.on = false;
            }
            //up arrow cursor functionality
            if (this.cursors.up.isDown)
            {
                this.dory.y -= 8;
            }
            //down arrow cursor functionality
            else if (this.cursors.down.isDown)
            {
                this.dory.y += 8;
            }
        }
            //depending on the score will determine the quanitity and velocity of the sharks
            //the higher the score, quanitity and velocity increases

            if (this.score >= 500 && this.score < 1000) {
                this.sharkGenLoop.delay = 600
                this.single.body.velocity.x = -400;
            }
            else if (this.score >= 1000 && this.score < 2000) {
                this.sharkGenLoop.delay = 500
                this.single.body.velocity.x = -380;
            }
            else if (this.score >= 2000 && this.score < 3500) {
                this.sharkGenLoop.delay = 400
                this.single.body.velocity.x = -450;
            }
            else if (this.score >= 3500 && this.score < 5500) {
                this.sharkGenLoop.delay = 300
                this.single.body.velocity.x = -550;
            }
            else if (this.score >= 5500 && this.score < 6500) {
                this.sharkGenLoop.delay = 200
                this.single.body.velocity.x = -650;
            }
            else if (this.score >= 6500){
                this.sharkGenLoop.delay = 170
                this.single.body.velocity.x = -750;
            }

            //Line 55-61 does not continue to update score.
            //the following will update score continuously
            this.scoreLabel.text = `SCORE: ${this.score}`;

            //Line 51 does not continue to update CHANCE OF SURVIVAL.
            //the following will update chanceOfSurvival level when needed
            this.chanceOfSurvivalText.text = `CHANCE OF SURVIVAL: ${this.chanceOfSurvival}%`;

            //The following is updated once the game is over
            if (this.chanceOfSurvival <= 0) {
                this.physics.pause();
                this.isGameOver = true;
                this.isGameOverText.visible = true;
                this.finalScoreText.text = `FINAL SCORE ${this.score}`;
                this.finalScoreText.visible = true;
                this.mainMenu.visible = false;
                this.playAgainText.visible = true;
                this.restartText.visible = false;
                clearInterval(this.timing);
            }
        }

}

