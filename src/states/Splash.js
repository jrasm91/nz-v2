import Phaser from 'phaser';
import { centerGameObjects } from '../utils';
import config from '../config';

export default class extends Phaser.State {
  init() {}

  preload() {
    let loadingBackground = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBackground');
    let loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBar');
    centerGameObjects([loadingBackground, loadingBar]);

    this.load.setPreloadSprite(loadingBar);

    this.load.spritesheet('player1', 'assets/images/player1.png', 64, 64);
    this.load.spritesheet('player2', 'assets/images/player2.png', 64, 64);
    this.load.spritesheet('gaurd1', 'assets/images/gaurd1.png', 64, 64);
    this.load.spritesheet('enemy', 'assets/images/enemy1.png', 64, 64);


    this.load.spritesheet('weapons:spear', 'assets/images/spear.png', 64, 64);


    this.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset01', 'assets/images/tileset01.png');
    this.load.image('tileset02', 'assets/images/tileset02.png');
    this.load.image('tileset03', 'assets/images/tileset03.png');
    this.load.image('meta_tiles', 'assets/images/meta_tiles.png');
  }

  create() {
    this.state.start('Game');
  }
}