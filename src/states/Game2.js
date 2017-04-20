/* globals __DEV__ */
import Phaser from 'phaser'
import Player1 from '../sprites/Player1'
import HealthBar from '../sprites/HealthBar'
import Crystal from '../sprites/Crystal'

export default class extends Phaser.State {
  init() {
    this.isPassable = false;
  }
  preload() {}

  create() {
      this.physics.startSystem(Phaser.Physics.ARCADE);

      this.map = this.game.add.tilemap('map4');
      this.map.addTilesetImage('meta_tiles');
      this.map.addTilesetImage('tileset01');

      this.collisionLayer = this.map.createLayer('Collisions');
      this.collisionLayer.debug = true
      this.map.createLayer('Background')
      this.map.createLayer('Partials')

      this.collisionLayer.resizeWorld();
      this.map.setCollisionBetween(0, 10000, true, this.collisionLayer)

      this.player1 = new Player1({
        game: this.game,
        x: 450,
        y: 150,
        asset: 'player'
      })

      this.physics.arcade.enable(this.player1);
      this.camera.follow(this.player1);
      this.player1.debug = true

      this.healthbar = new HealthBar({
        game: this,
        x: this.game.width - 3,
        y: 3
      })
  }

  render() {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.player1, 32, 32)
      // this.game.debug.body(this.player1);
    }
  }

  update() {
    this.physics.arcade.collide(this.player1, this.collisionLayer)
  }
}