import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.kb = game.input.keyboard

  }

  update() {
    let dx = 0,
      dy = 0;

    if (!this.body.blocked.left && this.kb.isDown(Phaser.Keyboard.LEFT)) {
      dx -= config.player.speed;
    }
    if (!this.body.blocked.right && this.kb.isDown(Phaser.Keyboard.RIGHT)) {
      dx += config.player.speed;
    }
    if (!this.body.blocked.up && this.kb.isDown(Phaser.Keyboard.UP)) {
      dy -= config.player.speed;
    }
    if (!this.body.blocked.down && this.kb.isDown(Phaser.Keyboard.DOWN)) {
      dy += config.player.speed;
    }

    if (dx != 0 && dy != 0) {
      dx *= .707
      dy *= .707
    }

    this.body.velocity.x = dx
    this.body.velocity.y = dy
  }
}