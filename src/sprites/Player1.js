import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.kb = game.input.keyboard

    this.game.add.existing(this)

    this.animations.add('walk-left', [118, 119, 120, 121, 122, 123, 124, 125]);
    this.animations.add('walk-right', [144, 145, 146, 147, 148, 149, 150, 151]);
    this.animations.add('walk-up', [105, 106, 107, 108, 109, 110, 111, 112]);
    this.animations.add('walk-down', [131, 132, 133, 134, 135, 136, 137, 138]);

  }

  update() {
    let dx = 0,
      dy = 0;

    let SPEED = 15

    if (!this.body.blocked.left && 
        (this.kb.isDown(Phaser.Keyboard.LEFT) || this.kb.isDown(Phaser.Keyboard.A))) {
      dx -= config.player.speed;
      this.animations.play('walk-left', SPEED, true);
    }
    if (!this.body.blocked.right && 
        (this.kb.isDown(Phaser.Keyboard.RIGHT) || this.kb.isDown(Phaser.Keyboard.D))) {
      dx += config.player.speed;
      this.animations.play('walk-right', SPEED, true);

    }
    if (!this.body.blocked.up && 
        (this.kb.isDown(Phaser.Keyboard.UP) || this.kb.isDown(Phaser.Keyboard.W))) {
      dy -= config.player.speed;
      this.animations.play('walk-up', SPEED, true);

    }
    if (!this.body.blocked.down && 
        (this.kb.isDown(Phaser.Keyboard.DOWN) || this.kb.isDown(Phaser.Keyboard.S))) {
      dy += config.player.speed;
      this.animations.play('walk-down', SPEED, true);

    }
    if (dx != 0 && dy != 0) {
      dx *= .707;
      dy *= .707;
    }

    if(dx === 0 && dy === 0){
      this.animations.frame = 130;
    }

    this.body.velocity.x = dx;
    this.body.velocity.y = dy;
  }
}