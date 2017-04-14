/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player1 from '../sprites/Player1'

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    //  The 'map1' key here is the Loader key given in game.load.tilemap
    var map = game.add.tilemap('map1');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('Tileset1', 'tiles');

    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    var layer = map.createLayer('Background');

    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();

    // const bannerText = 'Phaser + ES6 + Webpack'
    // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    // banner.font = 'Bangers'
    // banner.padding.set(10, 16)
    // banner.fontSize = 40
    // banner.fill = '#77BFA3'
    // banner.smoothed = false
    // banner.anchor.setTo(0.5)

    // this.mushroom = new Mushroom({
    //   game: this,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // })

    this.player1 = new Player1({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'player1'
    })

    // this.game.add.existing(this.mushroom)
    this.game.add.existing(this.player1)

    game.camera.follow(this.player1);
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player1, 32, 32)
    }
  }

  update() {

  }
}