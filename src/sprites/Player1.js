import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)

  }

  create() {
    console.log('test')
  }

  update() {
    let dx = 0,
      dy = 0;

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      dx -= config.player.speed;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      dx += config.player.speed;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      dy -= config.player.speed;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      dy += config.player.speed;
    }

    this.body.velocity.x = dx
    this.body.velocity.y = dy

    // console.log(this.body.checkCollision)
  }
}