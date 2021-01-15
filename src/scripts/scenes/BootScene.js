import Phaser from 'phaser';
import bgPng from '../../assets/images/bg.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('bg', bgPng);
  }

  create() {
    this.scene.start('Preload');
  }
}
