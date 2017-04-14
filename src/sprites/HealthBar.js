import Phaser from 'phaser'
import config from '../config'

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
    var width = this.originalWidth * (this.health / 100)
    this.game.add.tween(this.healthBox).to({ width: width }, 250, Phaser.Easing.Linear.None, true);
  }
  update() {
    this.updateCrop();
  }
}


// var game = new Phaser.Game(500, 500, Phaser.CANVAS, '', {
//   preload: function() {
//     this.scale.pageAlignHorizontally = true;
//   },
//   create: function() {
//     var bmd = this.game.add.bitmapData(300, 40);
//     bmd.ctx.beginPath();
//     bmd.ctx.rect(0, 0, 300, 80);
//     bmd.ctx.fillStyle = '#00685e';
//     bmd.ctx.fill();

//     var bglife = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, bmd);
//     bglife.anchor.set(0.5);

//     bmd = this.game.add.bitmapData(280, 30);
//     bmd.ctx.beginPath();
//     bmd.ctx.rect(0, 0, 300, 80);
//     bmd.ctx.fillStyle = '#00f910';
//     bmd.ctx.fill();

//     this.widthLife = new Phaser.Rectangle(0, 0, bmd.width, bmd.height);
//     this.totalLife = bmd.width;

//     this.life = this.game.add.sprite(this.game.world.centerX - bglife.width / 2 + 10, this.game.world.centerY, bmd);
//     this.life.anchor.y = 0.5;
//     this.life.cropEnabled = true;
//     this.life.crop(this.widthLife);

//     this.game.time.events.loop(1500, this.cropLife, this);
//   },
//   cropLife: function() {
//     if (this.widthLife.width <= 0) {
//       this.widthLife.width = this.totalLife;
//     } else {
//       this.game.add.tween(this.widthLife).to({ width: (this.widthLife.width - (this.totalLife / 10)) }, 200, Phaser.Easing.Linear.None, true);
//     }
//   },
//   update: function() {
//     this.life.updateCrop();
//   }
// });