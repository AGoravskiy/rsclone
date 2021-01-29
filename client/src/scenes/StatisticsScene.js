import Phaser from 'phaser';

const output = document.querySelector('.output-value');

export default class Statistics extends Phaser.Scene {
  constructor() {
    super('Statistics');
  }

  create() {
    this.createModal();
    this.quit();
  }

  createModal() {
    this.body = document.querySelector('body');
    this.overlayModalStat = document.createElement('div');
    this.overlayModalStat.classList.add('overlay-statistics');
    this.body.appendChild(this.overlayModalStat);

    this.modalStat = document.createElement('div');
    this.modalStat.classList.add('list-statistics');
    this.body.appendChild(this.modalStat);
  }

  quit() {
    this.quitBtn = document.createElement('button');
    this.quitBtn.classList.add('btn', 'btn-primary', 'quit-from-statistics');
    this.quitBtn.textContent = 'QUIT';
    this.modalStat.appendChild(this.quitBtn);
    this.quitBtn.addEventListener('click', () => {
      this.overlayModalStat.style.display = 'none';
      this.modalStat.style.display = 'none';
      this.scene.start('Start');
    });
  }
}
