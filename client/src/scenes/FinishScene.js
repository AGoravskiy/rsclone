import Phaser from 'phaser';
import StatsPopup from '../classes/StatsPopup';

export default class FinishScene extends Phaser.Scene {
  constructor() {
    super('Finish');
  }

  init(data) {
    if (data.stats) { this.stats = data.stats; }
  }

  preload() {
    this.load.image('back', '../../assets/design/credits-back.png');
  }

  create() {
    this.add.image(0, 0, 'back').setOrigin(0);
    this.StatsPopup = new StatsPopup(this, this.stats);
  }
}
