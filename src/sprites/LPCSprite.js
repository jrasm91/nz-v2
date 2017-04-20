import Phaser from 'phaser';
import config from '../config';

export default class extends Phaser.Sprite {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.body.setSize(32, 50, 16, 12);

    this.animations.add('walk:left', [118, 119, 120, 121, 122, 123, 124, 125]);
    this.animations.add('walk:right', [144, 145, 146, 147, 148, 149, 150, 151]);
    this.animations.add('walk:up', [105, 106, 107, 108, 109, 110, 111, 112]);
    this.animations.add('walk:down', [131, 132, 133, 134, 135, 136, 137, 138]);
  }

  move({ left, right, up, down }, animationType, speed) {
    let dx = 0;
    let dy = 0;
    let animationDirection = ''

    if (left && !this.body.blocked.left) {
      dx += -speed;
      animationDirection = 'left';
    }
    if (right && !this.body.blocked.right) {
      dx += speed;
      animationDirection = 'right';
    }
    if (up && !this.body.blocked.up) {
      dy += -speed;
      animationDirection = 'up';
    }
    if (down && !this.body.blocked.down) {
      dy += speed;
      animationDirection = 'down';
    }

    if (dx !== 0 && dy !== 0) {
      // distance scales when moving both in x and y direction
      dx *= 0.707;
      dy *= 0.707;
      animationDirection = dx < 0 ? 'left' : 'right';
    }

    this.body.velocity.x = dx;
    this.body.velocity.y = dy;

    if (animationDirection) {
      this.animations.play(`${animationType}:${animationDirection}`, config.animations.WALK_SPEED, true);
    } else {
      this.animations.frame = 130;
    }
  }

  update() {}
}