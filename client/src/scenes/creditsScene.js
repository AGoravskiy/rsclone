import Phaser from 'phaser';
import WebFontFile from '../classes/WebFontFile';

export default class creditsScene extends Phaser.Scene {
  constructor() {
    super('credits');
  }

  preload() {
    this.load.image('backGround', '../../assets/design/credits-back.png');
    this.load.image('logo', '../../assets/design/logo_rs.png');
    this.load.addFile(
      new WebFontFile(this.load, ['Racing Sans One', 'Oswald']),
    );
  }

  create() {
    this.createBackground();
    this.createLabels();
    this.createBackBtn();
    this.createSchoolLink();
  }

  createBackground() {
    this.add.image(0, 0, 'backGround').setOrigin(0);
  }

  createLabels() {
    function openGithub(name) {
      const url = `https://github.com/${name}`;
      window.open(url, '_blank');
    }

    const list = [
      {
        name: 'Mikalai Kryshchanovich',
        login: 'Nicolay-kr',
        event: openGithub,
      },
      { name: 'Aleksej Goravskij', login: 'AGoravskiy', event: openGithub },
      { name: 'Maxim Andreev', login: 'nAzdAc', event: openGithub },
      { name: 'Ivan Shvets', login: 'ShvetsBy', event: openGithub },
    ];

    const menuTitleStyle = {
      fontFamily: '"racing sans one"',
      fontSize: '72px',
      fill: '#F3C178',
    };

    const menuItemsStyle = {
      fontFamily: '"Oswald"',
      fontSize: '36px',
      fill: '#F3C178',
      cursor: 'pointer',
    };

    const styleOver = { fill: '#FE5E41' };
    const spacing = 60;

    const mainMenuTitle = this.add.text(96, 112, 'Credits', menuTitleStyle);
    mainMenuTitle.alpha = 0.8;
    mainMenuTitle.setShadow(0, 4, '#0B0500', 4);

    let txt = { x: 96, y: 192 };
    for (let i = 0; i < list.length; i++) {
      (txt = this.add
        .text(txt.x, txt.y + spacing, list[i].name, menuItemsStyle)
        .setOrigin(0))
        .setShadow(0, 4, '#0B0500', 4)
        .setInteractive()
        .on('pointerover', function () {
          this.setStyle(styleOver);
        })
        .on('pointerout', function () {
          this.setStyle(menuItemsStyle);
        })
        .on(
          'pointerdown',
          () => {
            list[i].event(list[i].login);
          },
          this,
        );
    }
  }

  createBackBtn() {
    // const menuItemsStyle = {
    //     fontFamily: '"Oswald"',
    //     fontSize: '36px',
    //     fill: '#F3C178',
    //     cursor: 'pointer',
    //   };

    const buttonBack = this.add.graphics();
    this.buttonBack = buttonBack;
    // shadow
    buttonBack.fillRect(96, 544, 128, 52);
    buttonBack.fillStyle(2042936);
    // button
    buttonBack.fillRect(96, 544, 128, 48);
    buttonBack.fillStyle(722176, 0.7);

    this.add
      .text(130, 544, 'Back', {
        fontFamily: '"Oswald"',
        fontSize: '36px',
        fill: '#F3C178',
        cursor: 'pointer',
      })
      .setInteractive()
      .on('pointerover', function () {
        this.setStyle({ fill: '#FE5E41' });
      })
      .on('pointerout', function () {
        this.setStyle({ fill: '#F3C178' });
      })
      .on('pointerdown', () => {
        this.scene.start('Start');
      });
  }

  createSchoolLink() {
    this.add
      .image(76, 670, 'logo')
      .setOrigin(0)
      .setInteractive()
      .on('pointerdown', () => {
        window.open('https://rs.school/', '_blank');
      });
    this.add.text(344, 680, '2020 Q3', {
      fontFamily: '"Oswald"',
      fontSize: '18px',
      fill: '#F3C178',
      cursor: 'pointer',
    });
  }
}

// quit() {
//     this.quitBtn = document.createElement('button');
//     this.quitBtn.classList.add('btn', 'btn-primary', 'quit-from-select-map');
//     this.quitBtn.textContent = 'QUIT';
//     this.wrapper.appendChild(this.quitBtn);
//     this.quitBtn.addEventListener('click', () => {
//       this.mapsBg = document.querySelector('.maps-background');
//       this.mapsBg.classList.remove('active');

//       this.mapsSlider = document.querySelector('.maps-slider-wrapper');
//       this.mapsSlider.classList.remove('active-block');
//       this.scene.start('Start');
//     });
//   }
