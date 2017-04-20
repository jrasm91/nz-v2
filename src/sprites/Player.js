import Phaser from 'phaser';
import config from '../config';
import LPCSprite from './LPCSprite';

export default class extends LPCSprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'player');
    this.keyboard = game.input.keyboard;
  }

  update() {
    this.move({
      left: this.keyboard.isDown(Phaser.Keyboard.LEFT) || this.keyboard.isDown(Phaser.Keyboard.A),
      right: this.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.keyboard.isDown(Phaser.Keyboard.D),
      up: this.keyboard.isDown(Phaser.Keyboard.UP) || this.keyboard.isDown(Phaser.Keyboard.W),
      down: this.keyboard.isDown(Phaser.Keyboard.DOWN) || this.keyboard.isDown(Phaser.Keyboard.S)
    }, 'walk', config.player.WALK_SPEED);
  }
}