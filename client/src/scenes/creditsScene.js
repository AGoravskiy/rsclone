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
      new WebFontFile(this.load, ['Racing Sans One', 'Oswald'])
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

    const mainMenuTitle = this.add.text(96, 112, 'Credits', menuTitleStyle);
    mainMenuTitle.alpha = 0.8;
    mainMenuTitle.setShadow(0, 4, '#0B0500', 4);

    const MikalaiLink = this.add.text(
      96,
      284,
      'Mikalai Kryshchanovich',
      menuItemsStyle
    );
    this.MikalaiLink = MikalaiLink;
    MikalaiLink.setShadow(0, 4, '#0B0500', 4);
    MikalaiLink.setInteractive();

    const AleksejLink = this.add.text(
      96,
      344,
      'Aleksej Goravskij',
      menuItemsStyle
    );
    this.AleksejLink = AleksejLink;
    AleksejLink.setShadow(0, 4, '#0B0500', 4);
    AleksejLink.setInteractive();

    const MaximLink = this.add.text(96, 404, 'Maxim Andreev', menuItemsStyle);
    this.MaximLink = MaximLink;
    MaximLink.setShadow(0, 4, '#0B0500', 4);
    MaximLink.setInteractive();

    const IvanLink = this.add.text(96, 464, 'Ivan Shvets', menuItemsStyle);
    this.IvanLink = IvanLink;
    IvanLink.setShadow(0, 4, '#0B0500', 4);
    IvanLink.setInteractive();
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
    //shadow
    buttonBack.fillRect(96, 564, 128, 52);
    buttonBack.fillStyle(2042936);
    //button
    buttonBack.fillRect(96, 564, 128, 48);
    buttonBack.fillStyle(722176, 0.7);

    this.add.text(130, 564, 'Back', {
      fontFamily: '"Oswald"',
      fontSize: '36px',
      fill: '#F3C178',
      cursor: 'pointer',
    });
  }

  createSchoolLink() {
    this.add.image(96, 670, 'logo').setOrigin(0);
    this.add.text(346, 680, '2020 Q3', {
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
