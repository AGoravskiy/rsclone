import Phaser from 'phaser';

export default class Statistics extends Phaser.Scene {
  constructor() {
    super('Statistics');
  }

  create() {
    this.quit();
    this.getStat();
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
    this.quitBtn = document.querySelector('.back-button');
    this.quitBtn.addEventListener('click', () => {
      this.statisticsOverlay = document.querySelector('.section-wrapper');
      this.statisticsOverlay.classList.remove('active');

      this.statisticsBg = document.querySelector('.body-background');
      this.statisticsBg.classList.remove('active');
      this.scene.start('Start');
    });
  }

  getStat() {
    this.str = 'zalupa';
    console.log(this.str);
  }
}
