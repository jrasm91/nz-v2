import Phaser from 'phaser';
import config from '../config';

export default class extends Phaser.Sprite {
  constructor(game, x, y, assets) {
    super(game, x, y, null);
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.body.setSize(32, 50, -16, -18);
    // this.scale.setTo(2);

    for (let asset of assets) {
      this.addChild(new Phaser.Sprite(game, 0, 0, asset));
    }

    this.children.forEach(function(c) {
      c.anchor.setTo(0.5);
      c.animations.frame = 6 * 13;
      for (let i = 0; i < config.animations.actions.length; i++) {
        let a = config.animations.actions[i];
        c.animations.add(a.name, Phaser.ArrayUtils.numberArrayStep(13 * i, 13 * i + a.frameCount))
      }
    });
  }

  spellcast(speed) {
    this.play('spellcast:down',10,false);
  }

  thrust(directions, speed) {
    this.play( 'thrust:down', 10 ,false);
  }

  walk(directions, speed) {
    this.move(directions, 'walk', speed);
  }

  slash(directions, speed) {
    this.play('slash:down', 10, false);
  }

  shoot(directions, speed) {
    this.play('shoot:down', 10, false);
  }

  hurt(speed) {
    this.play('hurt', speed, false, true);
  }

  play() {
    this.children.forEach((c) => {
      c.play(...arguments);
    })
  }

  stop() {
    this.children.forEach((c) => {
      c.animations.frame = 6 * 13;
    })
  }

  move({ left, right, up, down }, animationType, speed) {
    let dx = 0;
    let dy = 0;
    let animationDirection = ''

    if (left && !this.body.blocked.left) {
      dx += -speed;
      animationDirection = 'left';
    }
    if (right && !this.body.blocked.right) {
      dx += speed;
      animationDirection = 'right';
    }
    if (up && !this.body.blocked.up) {
      dy += -speed;
      animationDirection = 'up';
    }
    if (down && !this.body.blocked.down) {
      dy += speed;
      animationDirection = 'down';
    }

    if (dx !== 0 && dy !== 0) {
      // distance scales when moving both in x and y direction
      dx *= 0.707;
      dy *= 0.707;
      // left | right animation when moving in both x-axis and y-axis
      animationDirection = dx < 0 ? 'left' : 'right';
    }

    this.body.velocity.x = dx;
    this.body.velocity.y = dy;

    if (animationDirection) {
      animationType = 'walk'
      this.play(`${animationType}:${animationDirection}`, config.animations.WALK_SPEED, true);
    } else {
      this.stop();
    }
  }

  update() {

    // console.log(this.children)
    // console.log(this.world.x);
    // console.log(this);
    // debugger;
    // this.children.forEach(function(c) {
    //   c.x = this.world.x;
    //   c.y = this.world.y;
    // })
  }
}