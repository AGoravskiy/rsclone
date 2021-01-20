import Phaser from 'phaser';

export default class SelectMapScene extends Phaser.Scene {
  constructor() {
    super('SelectMapScene');
  }

  create() {
    this.setEvents();
    this.carousel();
    this.checkBtns();
  }

  setEvents() {
    this.selectMap();
    this.quit();
  }

  selectMap() {
    this.maps = [...document.querySelectorAll('.maps-slider-item')];
    for (let i = 0; i < this.maps.length; i += 1) {
      this.maps[i].addEventListener('click', (event) => {
        const map = event.target.getAttribute('data-map');
        this.startGame(map);
      });
    }
  }

  carousel() {
    this.position = 0;
    this.sliderToShow = 1;
    this.sliderToScroll = 1;
    this.container = document.querySelector('.maps-slider-container');
    this.track = document.querySelector('.maps-slider-track');
    this.btnPrev = document.querySelector('.maps-btn-prev');
    this.btnNext = document.querySelector('.maps-btn-next');
    this.mapsCount = this.maps.length;
    this.mapsWidth = this.container.clientWidth / this.sliderToShow;
    this.movePosition = this.sliderToScroll * this.mapsWidth;

    for (let i = 0; i < this.maps.length; i += 1) {
      this.maps[i].style.minWidth = `${this.mapsWidth}px`;
    }

    this.btnNext.addEventListener('click', () => {
      const mapsLeft = this.mapsCount
      - (Math.abs(this.position) + this.sliderToShow * this.mapsWidth)
      / this.mapsWidth;
      this.position -= mapsLeft >= this.sliderToScroll
        ? this.movePosition
        : this.mapsLeft * this.mapsWidth;

      this.setPosition();
      this.checkBtns();
    });

    this.btnPrev.addEventListener('click', () => {
      const mapsLeft = Math.abs(this.position) / this.mapsWidth;
      this.position += mapsLeft >= this.sliderToScroll
        ? this.movePosition
        : this.mapsLeft * this.mapsWidth;

      this.setPosition();
      this.checkBtns();
    });
  }

  setPosition() {
    this.track.style.transform = `translatex(${this.position}px)`;
  }

  checkBtns() {
    this.btnPrev.disabled = this.position === 0;
    this.btnNext.disabled = this.position <= -(this.mapsCount - this.sliderToShow) * this.mapsWidth;
  }

  quit() {
    this.quitBtn = document.querySelector('.quit-from-select-map');
    this.quitBtn.addEventListener('click', () => {
      this.mapsBg = document.querySelector('.maps-background');
      this.mapsBg.classList.remove('active');

      this.mapsSlider = document.querySelector('.maps-slider-wrapper');
      this.mapsSlider.classList.remove('active-block');
      this.scene.start('Start');
    });
  }

  startGame(map) {
    this.mapsBg = document.querySelector('.maps-background');
    this.mapsBg.classList.remove('active');

    this.mapsSlider = document.querySelector('.maps-slider-wrapper');
    this.mapsSlider.classList.remove('active-block');

    this.scene.start('SelectCar', {
      client: this.client,
      map,
    });
    this.carsBg = document.querySelector('.cars-background');
    this.carsBg.classList.add('active');

    this.carsSlider = document.querySelector('.cars-slider-wrapper');
    this.carsSlider.classList.add('active-block');
  }
}
