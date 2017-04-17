/* globals __DEV__ */
import Phaser from 'phaser'
import Player1 from '../sprites/Player1'
import HealthBar from '../sprites/HealthBar'

export default class extends Phaser.State {
  init() {
    this.isPassable = false;
  }
  preload() {}

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    // this.physics.startSystem(Phaser.Physics.P2JS);

    this.map = game.add.tilemap('map1');
    this.map.addTilesetImage('tiles');

    this.layer = this.map.createLayer('Dungeon1');
    this.layer.resizeWorld();

    this.map.setCollisionBetween(1, 3)
    this.map.setCollision(11)
    this.map.setCollision(13)
    this.map.setCollisionBetween(21, 23)
    this.map.setCollisionBetween(31, 34) // doors
    this.map.setCollisionBetween(41, 42)
    this.map.setCollisionBetween(51, 52)

    this.layer.debug = true;

    this.player1 = new Player1({
      game: this,
      x: 150,
      y: this.world.centerY,
      asset: 'player1'
    })

    this.player1.debug = true

    // this.physics.p2.convertTilemap(map, layer);
    this.physics.arcade.enable(this.player1);

    // this.healthbar = new HealthBar({
    //   game: this,
    //   x: this.game.width - 3,
    //   y: 3
    // })

    // this.game.add.existing(this.healthbar)

    this.add.existing(this.player1)
    this.camera.follow(this.player1);

    this.game.input.keyboard.addCallbacks(this, null, null, (key) => {
      switch (key) {
        case 'd':
          this.isPassable = !this.isPassable
          this.map.setCollisionBetween(31, 34, !this.isPassable) // doors

          break
      }
    })
  }

  render() {
    // if (__DEV__) {
    this.game.debug.spriteInfo(this.player1, 32, 32)
      // this.game.debug.body(this.player1);
      // }
  }

  update() {
    this.physics.arcade.collide(this.player1, this.layer)
  }
}