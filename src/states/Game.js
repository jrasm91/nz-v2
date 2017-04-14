/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player1 from '../sprites/Player1'
import HealthBar from '../sprites/HealthBar'

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

    this.player1 = new Player1({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'player1'
    })

    this.healthbar = new HealthBar({
      game: this,
      x: this.game.width - 3,
      y: 3
    })

    // this.game.add.existing(this.mushroom)
    this.game.add.existing(this.healthbar)
    this.game.add.existing(this.player1)

    // var bglife = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, bmd);
    // bglife.anchor.set(0.5);
    // 

    this.game.camera.follow(this.player1);
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player1, 32, 32)
    }
  }

  update() {

  }
}