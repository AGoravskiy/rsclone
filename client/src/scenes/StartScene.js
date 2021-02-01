import Phaser, { Data } from 'phaser';
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
    this.esc = this.input.keyboard.addKey('ESC');
    this.esc.on(
      'down',
      function (event) {
        if (window.isPause) {
          this.scene.wake('Game');
          this.scene.sleep('Start');
          window.isPause = false;
        }
      },
      this
    );
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

    const mainMenuTitle = this.add.text(96, 112, 'Main menu', menuTitleStyle);
    mainMenuTitle.alpha = 0.8;
    mainMenuTitle.setShadow(0, 4, '#0B0500', 4);

    const menuItemsStyle = {
      fontFamily: '"Oswald"',
      fontSize: '36px',
      fill: '#F3C178',
      cursor: 'pointer',
    };

    const styleOver = { fill: '#FE5E41' };

    // const resumeBtn = this.add.text(96, 224, 'Resume', menuItemsStyle);
    // this.resumeBtn = resumeBtn;
    // resumeBtn.setShadow(0, 4, '#0B0500', 4);
    // resumeBtn.setInteractive();
    // resumeBtn.inputEnabled;
    // resumeBtn.useHandCursor = true;

    const onePlayerBtn = this.add.text(96, 252, 'One player', menuItemsStyle);
    this.onePlayerBtn = onePlayerBtn;
    onePlayerBtn.setShadow(0, 4, '#0B0500', 4);
    onePlayerBtn
      .setInteractive()
      .on('pointerover', function () {
        this.setStyle(styleOver);
      })
      .on('pointerout', function () {
        this.setStyle(menuItemsStyle);
      });

    const twoPlayerBtn = this.add.text(96, 312, 'Two players', menuItemsStyle);
    this.twoPlayerBtn = twoPlayerBtn;
    twoPlayerBtn.setShadow(0, 4, '#0B0500', 4);
    twoPlayerBtn
      .setInteractive()
      .on('pointerover', function () {
        this.setStyle(styleOver);
      })
      .on('pointerout', function () {
        this.setStyle(menuItemsStyle)
          .on('pointerover', function () {
            this.setStyle(styleOver);
          })
          .on('pointerout', function () {
            this.setStyle(menuItemsStyle);
          });
      });

    const settingsBtn = this.add.text(96, 372, 'Settings', menuItemsStyle);
    this.settingsBtn = settingsBtn;
    settingsBtn.setShadow(0, 4, '#0B0500', 4);
    settingsBtn
      .setInteractive()
      .on('pointerover', function () {
        this.setStyle(styleOver);
      })
      .on('pointerout', function () {
        this.setStyle(menuItemsStyle);
      });

    const statisticsBtn = this.add.text(96, 432, 'Statistics', menuItemsStyle);
    this.statisticsBtn = statisticsBtn;
    statisticsBtn.setShadow(0, 4, '#0B0500', 4);
    statisticsBtn
      .setInteractive()
      .on('pointerover', function () {
        this.setStyle(styleOver);
      })
      .on('pointerout', function () {
        this.setStyle(menuItemsStyle);
      });

    const creditsBtn = this.add.text(96, 492, 'Credits', menuItemsStyle);
    this.creditsBtn = creditsBtn;
    creditsBtn.setShadow(0, 4, '#0B0500', 4);
    creditsBtn
      .setInteractive()
      .on('pointerover', function () {
        this.setStyle(styleOver);
      })
      .on('pointerout', function () {
        this.setStyle(menuItemsStyle);
      });
  }

  setEvents() {
    this.onePlayerBtn.on('pointerdown', this.selectMap, this);
    this.twoPlayerBtn.on('pointerdown', this.requestGame, this);
    this.settingsBtn.on('pointerdown', this.selectSettings, this);
    this.statisticsBtn.on('pointerdown', this.viewStatistics, this);
    this.creditsBtn.on('pointerdown', this.viewCredits, this);
  }

  viewStatistics() {
    this.scene.start('Statistics');
    this.statisticsOverlay = document.querySelector('.section-wrapper');
    this.statisticsOverlay.classList.add('active');

    this.statisticsBg = document.querySelector('.stats-background');
    this.statisticsBg.classList.add('active');
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
    if (window.isPause) {
      console.log('Game stop');
      this.scene.stop('Game');
      window.isPause = false;
    }
    this.scene.switch('SelectMapScene');

    this.mapsBg = document.querySelector('.maps-background');
    this.mapsBg.classList.add('active');

    this.mapsSlider = document.querySelector('.maps-slider-wrapper');
    this.mapsSlider.classList.add('active-block');

    const lapsContainer = document.querySelector('.lapsSelect__container');
    if (lapsContainer) {
      lapsContainer.style.visibility = 'visible';
    }
  }

  viewCredits() {
    this.scene.start('Credits');
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
