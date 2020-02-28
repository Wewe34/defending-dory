/* eslint-disable quotes */
import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor () {
        super("Preload")
    }

    preload()
    {
    //background
    this.cameras.main.backgroundColor.setTo(0, 0, 0);

    //progress bar loading functions and styling

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(55, 207, 140, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 110,
            text: 'Loading...',
            style: {
                font: '30px Optima',
                fill: '#fff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(200, 60, 180, 1);
            progressBar.fillRect(470, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });

        //make progress bar and text disappear after completed
        this.load.on('complete', function () {
            console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

    //Landing page
        this.load.audio('justKeepSwimming', 'src/assets/Dory.mp3');
        this.load.audio('underwater', "src/assets/underthesea.mp3");
        this.load.image('bg', "src/assets/deepblue.jpg");
        this.load.image('sharkRight', "src/assets/sharkRight.png");
        this.load.image('fishRight', "src/assets/fishRight.png");

    //Menu page
        this.load.image('bg', "src/assets/deepblue.jpg");
        this.load.image('sharkLeft', "src/assets/sharkTrim.png");
        this.load.image('fishLeft', "src/assets/fishLeft.png");


    //Play page
         //audio
         this.load.audio('sharkHit', "./src/assets/hit.mp3");

         //images
         this.load.image('red', "src/assets/dripBlood.png");
         this.load.image('ocean', "src/assets/deepblue.jpg");
         this.load.image('sharkFaceLeft', "src/assets/sharkTrim.png");
         this.load.image('sharkRight', "src/assets/sharkRight.png");
         this.load.image('bubbleParticle', "src/assets/bubble.png");
         this.load.spritesheet('fish', "src/assets/spritesheet.png", {
             frameWidth: 480,
             frameHeight: 270
         });
         this.load.spritesheet('collideLeft', "src/assets/collideLeft.png", {
             frameWidth: 480,
             frameHeight: 270
         });

    //How To page
         this.load.image('bg', "src/assets/deepblue.jpg");

    }

    create()
    {
        this.scene.start('Landing');
    }
}