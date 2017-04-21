import Phaser from 'phaser';
import config from '../config';
import LPCSprite from './LPCSprite';

export default class extends LPCSprite {
  constructor({ game, x, y, sprites }) {
    super(game, x, y, sprites);
    this.walk({ down: true }, config.enemy.WALK_SPEED)
    this.startingLocation = { x, y };
  }

  update() {
    switch (this.body.facing) {
      case Phaser.DOWN:
        if (this.body.y > this.startingLocation.y + 75 || this.body.blocked.down) {
          this.walk({ right: true }, config.enemy.WALK_SPEED);
        }
        break;
      case Phaser.RIGHT:
        if (this.body.x > this.startingLocation.x + 250 || this.body.blocked.right) {
          this.walk({ up: true }, config.enemy.WALK_SPEED);
        }
        break;
      case Phaser.UP:
        if (this.body.y < this.startingLocation.y || this.body.blocked.up) {
          this.walk({ left: true }, config.enemy.WALK_SPEED);
        }
        break;
      case Phaser.LEFT:
        if (this.body.x < this.startingLocation.x || this.body.blocked.left) {
          this.walk({ down: true }, config.enemy.WALK_SPEED);
        }
        break;
    }
  }
}