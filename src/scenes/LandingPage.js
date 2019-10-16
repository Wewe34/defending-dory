/* eslint-disable quotes */
import Phaser from "phaser";

export default class LandingPage extends Phaser.Scene {
    constructor () {
        super("Landing")
    }

    create()
    {
        // add to scene
        this.add.image(100, 100, 'bg').setScale(0.5);
        this.add.text(this.sys.game.config.width / 7, 80,
             "DEFENDING DORY", { font: "100px Optima", fill: "#fff"});
        let enter = this.add.text(this.sys.game.config.width /2.5, this.sys.game.config.height / 2,
             "ENTER", { font: "50px Optima", fill: "#fff"});
        this.dory = this.physics.add.sprite(0, 320, 'fishRight').setScale(0.1);
        this.shark = this.physics.add.sprite(-450, 320, 'sharkRight').setScale(0.3);

        //dory properties
        this.dory.body.allowGravity = false;
        this.dory.body.velocity.x = 620;

        //sharks properties
        this.shark.body.allowGravity = false;
        this.shark.body.velocity.x = 680;


        // Enter add text interactivity and music start
        enter.setInteractive({ cursor: 'pointer' });
        enter.on("pointerup", () => {
            this.sound.play('justKeepSwimming', {
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0
            });
            this.sound.play('underwater', {
                mute: false,
                volume: 2,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0
            });

            this.scene.start('Menu')
        })

    }
}