import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.spritesheet('player1', 'assets/images/player1.png', 32, 42, 1)
    
    this.load.spritesheet('crystal-blue', 'assets/images/items/crystal-qubodup-ccby3-32-blue.png', 32, 32, 8)
    this.load.spritesheet('crystal-green', 'assets/images/items/crystal-qubodup-ccby3-32-green.png', 32, 32, 8)
    this.load.spritesheet('crystal-grey', 'assets/images/items/crystal-qubodup-ccby3-32-grey.png', 32, 32, 8)
    this.load.spritesheet('crystal-orange', 'assets/images/items/crystal-qubodup-ccby3-32-orange.png', 32, 32, 8)
    this.load.spritesheet('crystal-pink', 'assets/images/items/crystal-qubodup-ccby3-32-pink.png', 32, 32, 8)
    this.load.spritesheet('crystal-yellow', 'assets/images/items/crystal-qubodup-ccby3-32-yellow.png', 32, 32, 8)

    this.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('map4', 'assets/maps/map4.json', null, Phaser.Tilemap.TILED_JSON)
    
    this.load.image('tiles', 'assets/images/tiles.png')
    this.load.image('tileset01', 'assets/images/tileset01.png')
    this.load.image('meta_tiles', 'assets/images/meta_tiles.png')
  }

  create () {
    this.state.start('Game')
  }
}
