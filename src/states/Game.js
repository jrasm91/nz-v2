/* globals __DEV__ */
import Phaser from 'phaser';
import Player from '../sprites/Player';

export default class extends Phaser.State {
  init() {}

  preload() {}

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.map = this.game.add.tilemap('map1');
    this.map.addTilesetImage('meta_tiles');
    this.map.addTilesetImage('tileset01');

    this.collisionLayer = this.map.createLayer('Collisions');
    this.collisionLayer.debug = true;
    this.map.createLayer('Background');
    this.map.createLayer('Partials');

    this.collisionLayer.resizeWorld();
    this.map.setCollisionBetween(0, 10000, true, this.collisionLayer);

    this.player = new Player({
      game: this.game,
      x: 450,
      y: 150,
      asset: 'player'
    });

    this.camera.follow(this.player);
    this.player.debug = true;
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
      this.game.debug.body(this.player);
    }
  }

  update() {
    this.physics.arcade.collide(this.player, this.collisionLayer);
  }
}