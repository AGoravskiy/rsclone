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
    // this.style = {
    //   'background-color': 'lime',
    //   'width': '220px',
    //   'height': '100px',
    //   'font': '48px Arial',
    //   'font-weight': 'bold',
    //   'cursor':"pointer",
    //   'z-index': '10000',
    // };
    // this.element = this.add.dom(400, 300, 'div', this.style, 'this');
  }

  createSounds() {
    this.sounds = {
      // roar: this.sound.add('roar', { volume: 0.1 }),
      // game: this.sound.add('game', { volume: 0.2, loop: true }),
    };
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  createButtons() {
    this.resumeBtn = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 150, 'RESUME GAME',
      { font: 'bold 46px Arial', fill: '#FAFAD2', cursor: 'pointer' })
      .setOrigin(0.5)
      .setInteractive();
    // eslint-disable-next-line no-unused-expressions
    this.resumeBtn.inputEnabled;
    this.resumeBtn.useHandCursor = true;

    this.onePlayerBtn = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'ONE PLAYER',
      { font: 'bold 46px Arial', fill: '#FAFAD2', cursor: 'pointer' })
      .setOrigin(0.5)
      .setInteractive();

    this.twoPlayerBtn = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, 'TWO PLAYER',
      { font: 'bold 46px Arial', fill: '#FAFAD2', cursor: 'pointer' })
      .setOrigin(0.5)
      .setInteractive();

    this.settingsBtn = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'SETTINGS',
      { font: 'bold 46px Arial', fill: '#FAFAD2', cursor: 'pointer' })
      .setOrigin(0.5)
      .setInteractive();

    this.statisticsBtn = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'STATISTICS',
      { font: 'bold 46px Arial', fill: '#FAFAD2', cursor: 'pointer' })
      .setOrigin(0.5)
      .setInteractive();
  }

  setEvents() {
    this.resumeBtn.on('pointerdown',
      function (event) {
        this.scene.resume('Game');
      },
      this);
    this.onePlayerBtn.on('pointerdown', this.selectMap, this);
    this.twoPlayerBtn.on('pointerdown', this.requestGame, this);
    this.settingsBtn.on('pointerdown', this.selectSettings, this);
    this.statisticsBtn.on('pointerdown', this.viewStatistics, this);
  }

  viewStatistics() {
    this.scene.start('Statistics');
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

    this.mapsBg = document.querySelector('.maps-background');
    this.mapsBg.classList.add('active');

    this.mapsSlider = document.querySelector('.maps-slider-wrapper');
    this.mapsSlider.classList.add('active-block');

    const lapsContainer = document.querySelector('.lapsSelect__container');
    if (lapsContainer) {
      lapsContainer.style.visibility = 'visible';
    }
  }

  requestGame() {
    // инициализируем клиента
    this.client = new Client();
    // отправляем запрос игры на сервер
    this.client.init();
    // когда получили противника то стартуем игру
    this.client.on('game', this.startGame, this);
  }

  startGame(car, carProperty, map) {
    this.scene.start('Game', {
      client: this.client, car, carProperty, map,
    });
  }
}
