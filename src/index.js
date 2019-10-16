import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import PreloadScene  from "./scenes/PreloadScene";
import  LandingPage  from "./scenes/LandingPage";
import MenuScene  from "./scenes/MenuScene";
import  HowToScene  from "./scenes/HowToScene";
import  PlayGameScene  from "./scenes/PlayGameScene";


var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { x: -100 },
          //used to place wireframes around physics objects to help debug
          debug: false
      }
  },
  //scenes are placed in an array in the order that they load
  scene: [
      PreloadScene, LandingPage, MenuScene, HowToScene, PlayGameScene
  ]
};

const game = new Phaser.Game(config);


