import Phaser from 'phaser';
import config from '../config';
import LPCSprite from './LPCSprite';

export default class extends LPCSprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'enemy');
    this.anchor.setTo(0.5);
    this.kb = game.input.keyboard;

    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.body.setSize(32, 50, 16, 12);

    this.move({ down: true }, 'walk', config.enemy.WALK_SPEED)

    this.startingLocation = { x, y };
  }

  patrol(points) {
    // this.game.physics.moveToXY(this, x, y, config.enemy.WALK_SPEED);
    // TODO
  }

  update() {
    switch (this.body.facing) {
      case Phaser.DOWN:
        if (this.body.y > this.startingLocation.y + 75 || this.body.blocked.down) {
          this.move({ right: true }, 'walk', config.enemy.WALK_SPEED);
        }
        break;
      case Phaser.RIGHT:
        if (this.body.x > this.startingLocation.x + 250 || this.body.blocked.right) {
          this.move({ up: true }, 'walk', config.enemy.WALK_SPEED);
        }
        break;
      case Phaser.UP:
        if (this.body.y < this.startingLocation.y || this.body.blocked.up) {
          this.move({ left: true }, 'walk', config.enemy.WALK_SPEED);
        }
        break;
      case Phaser.LEFT:
        if (this.body.x < this.startingLocation.x || this.body.blocked.left) {
          this.move({ down: true }, 'walk', config.enemy.WALK_SPEED);
        }
        break;
    }
  }
}