/* globals __DEV__ */
import Phaser from 'phaser'
import Player1 from '../sprites/Player1'
import HealthBar from '../sprites/HealthBar'

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    var map = game.add.tilemap('map1');
    map.addTilesetImage('Tileset1', 'tiles');
    var layer = map.createLayer('Dungeon1');
    layer.resizeWorld();

    this.player1 = new Player1({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'player1'
    })

    this.healthbar = new HealthBar({
      game: this,
      x: this.game.width - 3,
      y: 3
    })

    this.game.add.existing(this.healthbar)
    this.game.add.existing(this.player1)

    this.game.camera.follow(this.player1);
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player1, 32, 32)
    }
  }

  update() {

  }
}