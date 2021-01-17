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
    this.scene.start('Login');
    this.settingsOverlay = document.querySelector('.log-overlay');
    this.settingsOverlay.classList.add('active');

    this.settingsBg = document.querySelector('.log-background');
    this.settingsBg.classList.add('active');
    this.loginMenu = document.querySelector('.login-div');
    this.loginMenu.classList.add('active');
  }
}
