import Phaser from 'phaser';

// const output = document.querySelector('.output-value');

export default class SettingsScene extends Phaser.Scene {
  constructor() {
    super('Settings');
  }

  create() {
    this.setEvents();
    this.changeVolume();
    this.changeLanguage();
    this.changeText();
  }

  setEvents() {
    this.quitBtn = document.querySelector('.quit-btn');
    this.quitBtn.addEventListener('click', () => {
      this.quit();
    });
  }

  changeVolume() {
    this.slider = document.getElementById('myRange');
    // output.innerHTML = localStorage.getItem('volume') || '0';
    window.value.innerHTML = localStorage.getItem('volume') || '0';
    this.slider.value = localStorage.getItem('volume') || '0';
    this.slider.oninput = function () {
      localStorage.setItem('volume', this.value);
      // output.innerHTML = this.value;
      window.value.innerHTML = this.value;
    };
  }

  changeLanguage() {
    this.selectLang = document.querySelector('.language-parameters');
    this.selectLang.addEventListener('change', () => {
      localStorage.setItem('language', this.selectLang.value);
      this.changeText();
    });
  }

  changeText() {
    this.lang = localStorage.getItem('language');
    this.firstOption = document.querySelector('.first-parameters-in-lang');
    this.textLang = document.querySelector('.language-text');
    this.textVolume = document.querySelector('.volume-text');
    this.textBtn = document.querySelector('.quit-btn');
    if (this.lang === 'russian') {
      this.textLang.innerHTML = 'Язык:';
      this.textVolume.innerHTML = 'Громкость:';
      this.textBtn.innerHTML = 'Выйти:';
      this.firstOption.text = 'Выберите ваш язык';
    } else if (this.lang === 'belarusian') {
      this.textLang.innerHTML = 'Мова:';
      this.textVolume.innerHTML = 'Гучнасць:';
      this.textBtn.innerHTML = 'Выйсці:';
      this.firstOption.text = 'Выберыце вашу мову';
    } else {
      this.textLang.innerHTML = 'Language:';
      this.textVolume.innerHTML = 'Volume:';
      this.textBtn.innerHTML = 'Quit:';
      this.firstOption.text = 'Choose your language';
    }
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
