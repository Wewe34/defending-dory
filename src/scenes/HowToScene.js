/* eslint-disable quotes */
import Phaser from "phaser";

export default class HowToScene extends Phaser.Scene {
    constructor () {
        super('HowTo')
    }

    create() {

        //background add to scene
        this.add.image(100, 100, 'bg').setScale(0.5);


        //How To Directions.

        this.add.text(
            150, 150,
             'HOW TO PLAY',
             { font: '60px Optima', fill: '#fff'}
             );
        this.add.text(
            150, 250,
            'I...I...I cut myself trying to find my way back home!',
            { font: '25px Optima', fill: '#fff'}
            );
        this.add.text(
            150, 280,
            "I don't remember how it happened!",
            { font: '25px Optima', fill: '#fff'}
            );
        this.add.text(
            150, 310,
            'Now the nearby sharks have a taste for my blood and I..I..I..I\'m in great danger!!',
            { font: '25px Optima', fill: '#fff'}
            );
        this.add.text(
            150, 340,
            'Use the up, down, left and right arrow keys to help me dodge the sharks!',
            { font: '25px Optima', fill: '#fff'}
            );
        this.add.text(
            150, 370,
            'If I am hit or get too close, my chance of survival percentage will decrease!',
            { font: '25px Optima', fill: '#fff'}
            );
        this.add.text(
            150, 400,
            'Don\'t let it get to 0% or it\'s Game Over for the both of us!',
            { font: '25px Optima', fill: '#fff'}
            );
        this.add.text(
            150, 430,
            'The longer you last the higher your score. BUT, more sharks will come and they are much faster!',
            { font: '25px Optima', fill: '#fff'}
            );
        this.add.text(
            150, 460,
            'So whatever you do, just keep swimming, just keep swimming, just keep swimming..',
            { font: '25px Optima', fill: '#fff'}
            );

       // Back text add to scene and interactivity
        let back = this.add.text(150, 530, 'BACK', { font: '40px Optima', fill: '#fff'});
        back.setInteractive({ cursor: 'pointer' });
        back.on("pointerup", () => {
            this.scene.start('Menu')
        })
    }
}