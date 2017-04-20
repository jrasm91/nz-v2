import Phaser from 'phaser';
import WebFont from 'webfontloader';

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#333';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload() {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    });

    this.add.text(this.world.centerX, this.world.centerY, 'Loading...', {
      font: '24px Arial',
      fill: '#ddd',
      align: 'center'
    }).anchor.setTo(0.5, 0.5);

    this.load.image('loadingBar', './assets/images/loading_bar.png');
    this.load.image('loadingBackground', './assets/images/loading_background.png');
  }

  render() {
    if (this.fontsReady) {
      this.state.start('Splash');
    }
  }

  fontsLoaded() {
    this.fontsReady = true;
  }
}