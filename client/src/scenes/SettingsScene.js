import Phaser from 'phaser';
import {
  backButtonLang, startSceneLang,
  settingsSceneLang, dropDownLang,
  sliderVolume, wordChoose,
} from '../utils/itemDescription';
import { createDivElem } from '../utils/simpleFunc/tableFunc';

export default class SettingsScene extends Phaser.Scene {
  constructor() {
    super('Settings');
  }

  create() {
    if (localStorage.getItem('language')) {
      this.lang = localStorage.getItem('language');
    } else {
      this.lang = 'english';
    }
    this.settingsPageWrapper = document.querySelector('.settings-page-wrapper');
    if (this.settingsPageWrapper.firstChild) {
      while (this.settingsPageWrapper.firstChild) {
        this.settingsPageWrapper.removeChild(this.settingsPageWrapper.firstChild);
      }
    }
    this.createSettingsWrapper(this.settingsPageWrapper, this.lang);
    this.createSettingsIllustrationWrapper(this.settingsPageWrapper);
    this.dropDown = document.querySelector('.first-parameters-in-lang');
    this.dropDown.innerHTML = `${wordChoose[this.lang]}`;
    this.changeLanguage();
    this.changeVolume();
  }

  createSettingsWrapper(mainDiv, lang) {
    this.settingsWrapper = document.createElement('div');
    this.settingsWrapper.classList.add('settings-wrapper');
    this.createMainTitle(this.settingsWrapper, startSceneLang.settings[this.lang]);
    this.createLangBlock(this.settingsWrapper, lang);
    this.createVolumeBlock(this.settingsWrapper, lang);
    this.createBackButton(this.settingsWrapper, `${backButtonLang[this.lang]}`);
    mainDiv.appendChild(this.settingsWrapper);
  }

  createMainTitle(mainDiv, content) {
    this.mainTitle = document.createElement('h1');
    this.mainTitle.classList.add('track-title');
    this.mainTitle.textContent = content;
    mainDiv.appendChild(this.mainTitle);
  }

  createLangBlock(mainDiv, lang) {
    this.langBlock = document.createElement('div');
    this.langBlock.classList.add('settings-description-block');
    this.createLangDescription(this.langBlock, `${settingsSceneLang.language[lang]}`);
    createDivElem(this.langBlock, dropDownLang, 'setting-lang-block');
    mainDiv.appendChild(this.langBlock);
  }

  createVolumeBlock(mainDiv, lang) {
    this.volumeBlock = document.createElement('div');
    this.volumeBlock.classList.add('settings-description-block');
    this.createVolumeDescription(this.volumeBlock, `${settingsSceneLang.volume[lang]}`);
    createDivElem(this.volumeBlock, sliderVolume, 'setting-volume-block');
    mainDiv.appendChild(this.volumeBlock);
  }

  createLangDescription(mainDiv, content) {
    this.settingDescription = document.createElement('div');
    this.settingDescription.classList.add('setting-description');
    this.settingDescription.innerHTML = content;
    mainDiv.appendChild(this.settingDescription);
  }

  createVolumeDescription(mainDiv, content) {
    this.settingDescription = document.createElement('div');
    this.settingDescription.classList.add('setting-description');
    this.volumeValue = document.createElement('span');
    this.volumeValue.classList.add('output-value');
    this.settingDescription.innerHTML = content;
    this.settingDescription.appendChild(this.volumeValue);
    mainDiv.appendChild(this.settingDescription);
  }

  createBackButton(mainDiv, content) {
    this.backButton = document.createElement('button');
    this.backButton.classList.add('settings-button');
    this.backButton.textContent = content;
    mainDiv.appendChild(this.backButton);
    this.backButton.addEventListener('click', () => {
      this.settingsPageWrapper.classList.remove('active');
      this.scene.start('Start');
    });
  }

  createSettingsIllustrationWrapper(mainDiv) {
    this.IllustrationWrapper = document.createElement('div');
    this.IllustrationWrapper.classList.add('settings-illustration-wrapper');
    mainDiv.appendChild(this.IllustrationWrapper);
  }

  changeVolume() {
    this.slider = document.getElementById('myRange');
    this.volumeValue = document.querySelector('.output-value');
    this.volumeValue.innerHTML = localStorage.getItem('volume') || '0';
    this.slider.value = localStorage.getItem('volume') || '0';
    this.slider.oninput = function () {
      this.volumeValue = document.querySelector('.output-value');
      localStorage.setItem('volume', this.value);
      this.volumeValue.innerHTML = this.value;
    };
  }

  changeLanguage() {
    this.selectLang = document.querySelector('.language-parameters');
    this.selectLang.addEventListener('change', () => {
      localStorage.setItem('language', this.selectLang.value);
    });
  }
}
