import Phaser from 'phaser';

const PORT = 3000;

const HOST = process.env.NODE_ENV === 'development' ? `http://localhost:${PORT}` : 'https://crazyrace.herokuapp.com/';

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super('Login');
  }

  create() {
    this.startPreload();
    this.setEvents();
  }

  startPreload() {
    this.preloadBtn = document.querySelector('.preload-btn');
    this.preloadBtn.addEventListener('click', () => {
      this.settingsOverlay = document.querySelector('.log-overlay');
      this.settingsOverlay.classList.remove('active');
      this.settingsBg = document.querySelector('.log-background');
      this.settingsBg.classList.remove('active');
      this.loginMenu = document.querySelector('.login-div');
      this.loginMenu.classList.remove('active');
      this.scene.start('Preload');
    });
  }

  setEvents() {
    this.submitBtn = document.querySelector('.important-button');
    this.submitBtn.addEventListener('click', () => {
      this.signIn();
    });
  }

  signIn() {
    this.data = {
      email: document.forms[0].elements[0].value,
      password: document.forms[0].elements[1].value,
    };
    this.sendData = JSON.stringify(this.data);
    console.log(this.sendData);
    this.xhr = new XMLHttpRequest();
    this.xhr.open('POST', `${HOST}/login`, true);
    this.xhr.onreadystatechange = () => this.startPreload();
    this.xhr.send(this.sendData);
    this.xhr.onload = () => this.startPreload();
  }
}
