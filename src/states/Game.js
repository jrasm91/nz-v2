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
          'body/male/tanned2',
          'torso/chain/mail_male',
          'head/helms/male/metal_helm_male',
          'hands/gloves/male/metal_gloves_male',
          'legs/armor/male/metal_pants_male',
          'feet/armor/male/metal_boots_male',
          'weapons/right hand/male/spear_male'
        ]
      }));
    }

    this.player = new Player({
      game: this.game,
      x: 450,
      y: 150,
      sprites: [
        'body/male/tanned2',
        'body/male/eyes/blue',
        'head/helms/male/golden_helm_male',
        'hands/gloves/male/golden_gloves_male',
        'torso/gold/chest_male',
        'torso/gold/arms_male',
        'legs/armor/male/golden_greaves_male',
        'feet/armor/male/golden_boots_male',
        'weapons/right hand/male/spear_male'
        // 'body:light',
        // 'eyes:blue',
        // 'nose:straight_dark',
        // 'armor:chain_hood',
        // 'armor:chain_torso',
        // 'armor:metal_boots',
        // 'armor:metal_pants',
        // 'armor:metal_chest',
        // // 'armor:shield',
        // 'weapon:spear'
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