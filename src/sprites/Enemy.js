import Phaser from 'phaser';
import config from '../config';

export default class extends Phaser.Sprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'enemy');
    this.anchor.setTo(0.5);
    this.kb = game.input.keyboard;

    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.body.setSize(32, 50, 16, 12);
    this.body.facing = Phaser.DOWN;
    this.body.velocity.y = config.enemy.WALK_SPEED;

    this.animations.add('walk-left', [118, 119, 120, 121, 122, 123, 124, 125]);
    this.animations.add('walk-right', [144, 145, 146, 147, 148, 149, 150, 151]);
    this.animations.add('walk-up', [105, 106, 107, 108, 109, 110, 111, 112]);
    this.animations.add('walk-down', [131, 132, 133, 134, 135, 136, 137, 138]);

    this.animations.play('walk-down', config.animations.WALK_SPEED, true);

    this.startingLocation = { x, y };
  }

  update() {
    switch (this.body.facing) {
      case Phaser.DOWN:
        if (this.body.y > this.startingLocation.y + 75 || this.body.blocked.down) {
          this.animations.play('walk-right', config.animations.WALK_SPEED, true);
          this.body.velocity.x = config.enemy.WALK_SPEED;
          this.body.velocity.y = 0;
        }
        break;
      case Phaser.RIGHT:
        if (this.body.x > this.startingLocation.x + 250 || this.body.blocked.right) {
          this.animations.play('walk-up', config.animations.WALK_SPEED, true);
          this.body.velocity.x = 0;
          this.body.velocity.y = -config.enemy.WALK_SPEED;
        }
        break;
      case Phaser.UP:
        if (this.body.y < this.startingLocation.y || this.body.blocked.up) {
          this.animations.play('walk-left', config.animations.WALK_SPEED, true);
          this.body.velocity.x = -config.enemy.WALK_SPEED;
          this.body.velocity.y = 0;
        }
        break;
      case Phaser.LEFT:
        if (this.body.x < this.startingLocation.x || this.body.blocked.left) {
          this.animations.play('walk-down', config.animations.WALK_SPEED, true);
          this.body.velocity.x = 0;
          this.body.velocity.y = config.enemy.WALK_SPEED;
        }
        break;
    }
  }
}