/* globals __DEV__ */
import Phaser from 'phaser';
import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';

export default class extends Phaser.State {
  init() {}

  preload() {}

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.map = this.game.add.tilemap('map1');
    this.map.addTilesetImage('meta_tiles');
    this.map.addTilesetImage('tileset01');
    this.map.addTilesetImage('tileset02');
    this.map.addTilesetImage('tileset03');

    this.collisionLayer = this.map.createLayer('Collisions');
    this.map.createLayer('Background');
    this.map.createLayer('Partials1');
    this.map.createLayer('Partials2');
    // this.collisionLayer.debug = true;

    this.collisionLayer.resizeWorld();
    this.map.setCollisionBetween(0, 10000, true, this.collisionLayer);

    this.enemies = [];
    for (let i = 0; i < 1; i++) {
      this.enemies.push(new Enemy({
        game: this.game,
        x: 50,
        y: 25,
        sprites: [
          // http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/#?body=dark&eyes=red&armor=chest_plate&mail=chain&shoulders=none&gloves=metal&hat=hood_chain&shoes=boots_metal&legs=pants_white&arms=plate&hair=none&=eyes_brown
          'gaurd1',
          'weapons:spear'
        ]
      }));
    }

    this.player = new Player({
      game: this.game,
      x: 450,
      y: 150,
      sprites: [
        // http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/#?body=tanned&eyes=blue&nose=straight&ears=none&legs=none&clothes=longsleeve_brown&mail=chain&armor=chest_leather&jacket=none&tie=none&hair=messy2_raven&arms=none&shoulders=leather&spikes=none&bracers=none&greaves=none&hat=none&shoes=none&belt=none&bracelet=none
        'player1'
      ]
    });

    this.camera.follow(this.player);
    this.player.debug = true;
  }

  render() {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.player, 32, 32);
      // this.game.debug.body(this.player);
    }
  }

  update() {
    this.physics.arcade.collide(this.player, this.collisionLayer);
    this.physics.arcade.collide(this.enemies, this.collisionLayer);
    this.physics.arcade.collide(this.player, this.enemies);
  }
}