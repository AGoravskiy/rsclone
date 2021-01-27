import Phaser from 'phaser';
import Client from '../classes/Client';
import WebFontFile from '../classes/WebFontFile';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }
  preload() {
    this.load.image('mainMenuBack', '../../assets/design/main-menu-back.png');
    this.load.addFile(
      new WebFontFile(this.load, ['Racing Sans One', 'Oswald'])
    );
    // this.load.addFile(new WebFontFile(this.load, 'Oswald'));
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
    this.add.image(0, 0, 'mainMenuBack').setOrigin(0);
  }

  createButtons() {
    const menuTitleStyle = {
      fontFamily: '"racing sans one"',
      fontSize: '72px',
      fill: '#F3C178',
    };
    // const shadow = {
    //   0, 4, '#0B0500', 4
    // };
    const mainMenuTitle = this.add.text(96, 112, 'Main menu', menuTitleStyle);
    mainMenuTitle.alpha = 0.8;
    mainMenuTitle.setShadow(0, 4, '#0B0500', 4);

    const menuItemsStyle = {
      fontFamily: '"Oswald"',
      fontSize: '36px',
      fill: '#F3C178',
      cursor: 'pointer',
    };

    const resumeBtn = this.add.text(96, 224, 'Resume', menuItemsStyle);
    resumeBtn.setShadow(0, 4, '#0B0500', 4);
    resumeBtn.setInteractive();

    const onePlayerBtn = this.add.text(96, 284, 'One player', menuItemsStyle);
    onePlayerBtn.setShadow(0, 4, '#0B0500', 4);
    // this.onePlayerBtn.setInteractive();

    const twoPlayerBtn = this.add.text(96, 344, 'Two players', menuItemsStyle);
    twoPlayerBtn.setShadow(0, 4, '#0B0500', 4);
    twoPlayerBtn.setInteractive();

    const settingsBtn = this.add.text(96, 404, 'Setting', menuItemsStyle);
    settingsBtn.setShadow(0, 4, '#0B0500', 4);
    settingsBtn.setInteractive();

    const statisticsBtn = this.add.text(96, 464, 'Statistics', menuItemsStyle);
    statisticsBtn.setShadow(0, 4, '#0B0500', 4);
    statisticsBtn.setInteractive();

    const creditsBtn = this.add.text(96, 524, 'Credits', menuItemsStyle);
    creditsBtn.setShadow(0, 4, '#0B0500', 4);
    creditsBtn.setInteractive();

    // resumeBtn.setInteractive();
    // this.resumeBtn.inputEnabled;
    // this.resumeBtn.useHandCursor = true;

    // const resumeBtn = this.add.text(95, 110, 'Resume', {
    //   fontFamily: '"Oswald"',
    //   fontSize: '36px',
    // });

    // this.resumeBtn = this.add
    //   .text(
    //     this.cameras.main.centerX,
    //     this.cameras.main.centerY - 150,
    //     'RESUME GAME',
    //     { font: 'bold 46px Arial', fill: '#FAFAD2', cursor: 'pointer' }
    //   )
    //   .setOrigin(0.5)
    //
    // // eslint-disable-next-line no-unused-expressions
    // this.resumeBtn.inputEnabled;
    // this.resumeBtn.useHandCursor = true;

    // this.onePlayerBtn = this.add
    //   .text(
    //     this.cameras.main.centerX,
    //     this.cameras.main.centerY - 100,
    //     'ONE PLAYER',
    //     { font: 'bold 46px Arial', fill: '#FAFAD2', cursor: 'pointer' }
    //   )
    //   .setOrigin(0.5)
    //   .setInteractive();

    // this.twoPlayerBtn = this.add
    //   .text(
    //     this.cameras.main.centerX,
    //     this.cameras.main.centerY - 50,
    //     'TWO PLAYER',
    //     { font: 'bold 46px Arial', fill: '#FAFAD2', cursor: 'pointer' }
    //   )
    //   .setOrigin(0.5)
    //   .setInteractive();

    // this.settingsBtn = this.add
    //   .text(this.cameras.main.centerX, this.cameras.main.centerY, 'SETTINGS', {
    //     font: 'bold 46px Arial',
    //     fill: '#FAFAD2',
    //     cursor: 'pointer',
    //   })
    //   .setOrigin(0.5)
    //   .setInteractive();

    // this.statisticsBtn = this.add
    //   .text(
    //     this.cameras.main.centerX,
    //     this.cameras.main.centerY + 50,
    //     'STATISTICS',
    //     { font: 'bold 46px Arial', fill: '#FAFAD2', cursor: 'pointer' }
    //   )
    //   .setOrigin(0.5)
    //   .setInteractive();
  }

  setEvents() {
    this.resumeBtn.on(
      'pointerdown',
      function (event) {
        this.scene.resume('Game');
      },
      this
    );
    this.onePlayerBtn.on('pointerdown', this.selectMap, this);
    this.twoPlayerBtn.on('pointerdown', this.requestGame, this);
    this.settingsBtn.on('pointerdown', this.selectSettings, this);
    this.statisticsBtn.on('pointerdown', this.viewStatistics, this);
  }

  viewStatistics() {
    this.scene.start('Statistics');
    this.statOverlay = document.querySelector('.stat-overlay');
    this.statOverlay.classList.add('active');

    this.statBg = document.querySelector('.stat-background');
    this.statBg.classList.add('active');
    this.statTable = document.querySelector('.stat-table');
    this.statTable.classList.add('active');
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
      client: this.client,
      car,
      carProperty,
      map,
    });
  }
}
