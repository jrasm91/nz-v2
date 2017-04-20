import Phaser from 'phaser';
import config from '../config';

export default class extends Phaser.Sprite {
  constructor({ game, x, y }) {
    var hbConfig = config.player.healthbar;
    x -= hbConfig.width;
    super(game, x, y);

    this.health = 100;

    var backgroundBitmap = game.add.bitmapData(hbConfig.width, hbConfig.height);
    backgroundBitmap.ctx.beginPath();
    backgroundBitmap.ctx.rect(0, 0, hbConfig.width, hbConfig.height);
    backgroundBitmap.ctx.fillStyle = 'black';
    backgroundBitmap.ctx.fill();

    this.backgroundSprite = game.add.sprite(x, y, backgroundBitmap);
    this.backgroundSprite.anchor.setTo(0);

    var bitmapData = game.add.bitmapData(hbConfig.width, hbConfig.height);
    bitmapData.ctx.beginPath();
    bitmapData.ctx.rect(0, 0, hbConfig.width, hbConfig.height);
    bitmapData.ctx.fillStyle = 'red';
    bitmapData.ctx.fill();

    this.bitmapData = bitmapData;
    this.loadTexture(this.bitmapData);
    this.healthBox = new Phaser.Rectangle(0, 0, bitmapData.width, bitmapData.height);
    this.originalWidth = bitmapData.width;
    this.cropEnabled = true;
    this.crop(this.healthBox);

    this.fixedToCamera = this.backgroundSprite.fixedToCamera = true;

    game.time.events.loop(500, () => { this.hit(20); }, this);
  }
  hit(amount) {
    this.health -= amount;
    if (this.health < 0) {
      this.health = 100;
    }
    var width = this.originalWidth * (this.health / 100);
    this.game.add.tween(this.healthBox).to({ width: width }, 250, Phaser.Easing.Linear.None, true);
  }
  update() {
    this.updateCrop();
  }
}