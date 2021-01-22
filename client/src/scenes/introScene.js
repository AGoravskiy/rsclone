import Phaser from 'phaser';

export default class introScene extends Phaser.Scene {
  constructor() {
    super('intro');
  }

  preload() {
    this.load.video(
      'intro',
      '../../assets/video/welcome.mp4',
      'loadeddata',
      false,
      true
    );
    this.load.image('logo', '../../assets/images/rss.png');
  }

  create() {
    const vid = this.add.video(640, 360, 'intro');
    vid.play();
    vid.setPaused(false);

    this.add.text(800, 250, 'Need for Speed', {
      fontFamily: '"Racing sans one", Times, serif',
    });
    this.add.text(800, 350, 'Java Script Unleashed', {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
    this.add.image(200, 400, 'logo');
    this.add.text(600, 400, 'Clone wars', {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
    this.add.text(600, 500, 'Clone wars', {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
  }
}
