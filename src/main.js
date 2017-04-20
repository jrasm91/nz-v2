import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import SplashState from './states/Splash';
import GameState from './states/Game';
import GameState2 from './states/Game2';

import config from './config';

//https://opengameart.org/sites/default/files/terrain_3.png

class Game extends Phaser.Game {
  constructor() {
    const docElement = document.documentElement;
    // const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    // const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

    const width = docElement.clientWidth;
    const height = docElement.clientHeight;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    // this.state.add('Game', GameState, false)
    this.state.add('Game', GameState2, false);

    this.state.start('Boot');
  }
}

window.game = new Game();