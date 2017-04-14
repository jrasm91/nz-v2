import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
  }

  update () {
    this.angle += 1

    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.x -= 10;
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.x += 10;
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.y -= 10;
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.y += 10;
    }
  }
}
