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
      this.mapItems[i].addEventListener('click', (event) => {
        const path = event.target.src;
        let map = path.substr(path.indexOf('image') + 7);
        map = map.replace('.png', '');
        this.startGame(map);
      });
    }
  }

  startGame(map) {
    this.mapsOverlay = document.querySelector('.maps-overlay');
    this.mapsOverlay.classList.remove('active');

    this.mapsBg = document.querySelector('.maps-background');
    this.mapsBg.classList.remove('active');

    this.mapsMenu = document.querySelector('.maps-menu');
    this.mapsMenu.classList.remove('active');
    this.scene.start('SelectCar', { client: this.client, map });
  }
}
