import Phaser from 'phaser';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('Settings');
  }

  create() {
    this.setEvents();
  }

  setEvents() {
    this.quitBtn = document.querySelector('.quit-btn');
    this.quitBtn.addEventListener('click', () => {
      this.quit();
    });
  }

  quit() {
    this.settingsOverlay = document.querySelector('.settings-overlay');
    this.settingsOverlay.classList.remove('active');

    this.settingsBg = document.querySelector('.settings-background');
    this.settingsBg.classList.remove('active');

    this.modal = document.querySelector('.settings-menu');
    this.modal.classList.remove('active');
    this.scene.start('Start');
  }
}
