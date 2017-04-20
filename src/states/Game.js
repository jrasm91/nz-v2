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
    // this.physics.startSystem(Phaser.Physics.P2JS);

    this.map = this.game.add.tilemap('map1');
    this.map.addTilesetImage('tiles');
    this.layer = this.map.createLayer('Dungeon1');
    this.collisionLayer = this.map.createLayer('Walls');

    this.map.setCollisionBetween(0, 10000, true, this.collisionLayer);
    this.collisionLayer.resizeWorld();
    this.collisionLayer.debug = true;
    this.player1 = new Player1({
      game: this.game,
      x: 150,
      y: 150,
      asset: 'player'
    })


    this.physics.arcade.enable(this.player1);
    //this.add.existing(this.player1)
    this.camera.follow(this.player1);
    this.player1.debug = true

    // let colors = ['blue', 'green', 'grey', 'orange', 'pink', 'yellow']
    // this.crystals = []
    // for (let i = 0; i < 20; i++) {
    //   let r = Math.floor(Math.random() * 6)
    //   this.crystals.push(new Crystal({
    //     game: this.game,
    //     x: Math.floor(Math.random() * 750),
    //     y: Math.floor(Math.random() * 750),
    //     asset: `crystal-${colors[r]}`
    //   }))
    // }

    this.healthbar = new HealthBar({
      game: this,
      x: this.game.width - 3,
      y: 3
    })

    // this.game.add.existing(this.healthbar)

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
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.player1, 32, 32)
       this.game.debug.body(this.player1);
    }
  }

  update() {
    this.physics.arcade.collide(this.player1, this.collisionLayer)
  }
}