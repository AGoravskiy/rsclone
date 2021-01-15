import Phaser from 'phaser';
import Client from '../classes/Client';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  create() {
    this.createSounds();
    this.createBackground();
    this.createButtons();
    this.setEvents();
  }

  createSounds() {
    this.sounds = {
      roar: this.sound.add('roar', { volume: 0.1 }),
      menu: this.sound.add('menu', { volume: 0.2, loop: true }),
    };
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  createButtons() {
    this.onePlayerBtn = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'ONE PLAYER',
      { font: 'bold 46px Arial', fill: '#FAFAD2' })
      .setOrigin(0.5)
      .setInteractive();

    this.twoPlayerBtn = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, 'TWO PLAYER',
      { font: 'bold 46px Arial', fill: '#FAFAD2' })
      .setOrigin(0.5)
      .setInteractive();

    this.settingsBtn = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'SETTINGS',
      { font: 'bold 46px Arial', fill: '#FAFAD2' })
      .setOrigin(0.5)
      .setInteractive();
  }

  setEvents() {
    this.onePlayerBtn.on('pointerdown', this.selectMap, this);
    this.twoPlayerBtn.on('pointerdown', this.requestGame, this);
    this.settingsBtn.on('pointerdown', this.selectSettings, this);
  }

  selectSettings() {
    this.scene.start('Settings');
    this.settingsOverlay = document.querySelector('.settings-overlay');
    this.settingsOverlay.classList.add('active');

    this.settingsBg = document.querySelector('.settings-background');
    this.settingsBg.classList.add('active');

    this.settingsMenu = document.querySelector('.settings-menu');
    this.settingsMenu.classList.add('active');
  }

  playMusic() {
    this.sounds.menu.play();
  }

  selectMap() {
    this.scene.start('SelectMapScene');
    this.mapsOverlay = document.querySelector('.maps-overlay');
    this.mapsOverlay.classList.add('active');

    this.mapsBg = document.querySelector('.maps-background');
    this.mapsBg.classList.add('active');

    this.mapsMenu = document.querySelector('.maps-menu');
    this.mapsMenu.classList.add('active');
  }

  requestGame() {
    // инициализируем клиента
    this.client = new Client();
    // отправляем запрос игры на сервер
    this.client.init();
    // когда получили противника то стартуем игру
    this.client.on('game', this.startGame, this);
  }
}
