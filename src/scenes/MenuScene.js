/* eslint-disable quotes */
import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
    constructor () {
        super("Menu")
        this.swimmingCall = 0;
        this.isGameStarted = false;
    }

    create()
    {

        //add to scene
        this.add.image(100, 100, 'bg').setScale(0.5);
        this.add.text(this.sys.game.config.width / 7, 80,
             "DEFENDING DORY", { font: "100px Optima", fill: "#fff"});
        let howTo = this.add.text(this.sys.game.config.width / 3, 300,
             "HOW TO PLAY", { font: "50px Optima", fill: "#fff"}).setDepth(5);
        let playtext = this.add.text(this.sys.game.config.width / 2.4, 400,
             "PLAY", { font: "50px Optima", fill: "#fff"}).setDepth(5);

        if (this.swimmingCall === 0) {
            this.swimming();
            setInterval(() => {
                this.swimming();
            }, 5000)
            this.swimmingCall += 1;
        }

        //How to text and play text interactivity
        howTo.setInteractive({ cursor: 'pointer' });
        playtext.setInteractive({ cursor: 'pointer' });
        playtext.on("pointerup", () => {

            if (!this.isGameStarted)
            {
                this.isGameStarted = true;
                this.scene.start('Play')
            } else
            {
                this.scene.switch('Play')
            }
        })

        howTo.on("pointerup", () => {
            this.scene.start('HowTo')
        })
    }

    //dory and shark swimming across scene
    swimming() {
        this.dory = this.physics.add.sprite(window.innerWidth, 320, 'fishLeft').setScale(0.1);
        this.dory.body.allowGravity = false;
        this.dory.body.velocity.x = -620;

        this.shark = this.physics.add.sprite(window.innerWidth + 450, 320, 'sharkLeft').setScale(0.3);
        this.shark.body.allowGravity = false;
        this.shark.body.velocity.x = -680;
    }
}
