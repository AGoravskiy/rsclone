import Phaser from 'phaser';
import bgPng from '../../assets/images/bg.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create() {
    this.scene.start('Preload');
  }
}
