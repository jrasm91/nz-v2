import Phaser from 'phaser';
// import config from '../config';

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);

    // this.animations.add('walk');
    // this.anim.play(, 'walk')

    // this.animations.play('walk');

    this.game.add.existing(this);
    this.scale.set(1);
    this.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7], 5, true);

    this.animations.play('fly');
  }

  update() {}
}