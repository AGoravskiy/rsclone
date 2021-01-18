import Phaser from 'phaser';

export default class SelectMapScene extends Phaser.Scene {
  constructor() {
    super('SelectMapScene');
  }

  create() {
    this.setEvents();
  }

  setEvents() {
    this.mapItems = [...document.querySelectorAll('.map-item')];
    for (let i = 0; i < this.mapItems.length; i += 1) {
      this.mapItem = this.mapItems[i];
      this.mapItem.addEventListener('click', () => {
        this.startGame();
      });
    }
  }

  startGame() {
    this.mapsOverlay = document.querySelector('.maps-overlay');
    this.mapsOverlay.classList.remove('active');

    this.mapsBg = document.querySelector('.maps-background');
    this.mapsBg.classList.remove('active');

    this.mapsMenu = document.querySelector('.maps-menu');
    this.mapsMenu.classList.remove('active');
    this.scene.start('SelectCar', { client: this.client });
  }
}
