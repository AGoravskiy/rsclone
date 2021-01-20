import Phaser from 'phaser';

export default class SelectMapScene extends Phaser.Scene {
  constructor() {
    super('SelectMapScene');
  }

  create() {
    if (!this.track) {
      this.createMenu();
      this.carousel();
      this.quit();
      this.checkBtns();
    }
  }

  createMenu() {
    this.container = document.querySelector('.maps-slider-container');
    this.track = document.createElement('div');
    this.track.classList.add('maps-slider-track');

    function addMap(mainDiv, src, map) {
      const mapItem = document.createElement('div');
      mapItem.classList.add('maps-slider-item');

      const mapImage = document.createElement('img');
      mapImage.classList.add('map-image');
      mapImage.setAttribute('src', `${src}`);
      mapImage.setAttribute('data-map', `${map}`);
      mapItem.appendChild(mapImage);
      mainDiv.appendChild(mapItem);
    }

    addMap(this.track, '../assets/images/adelaidemap.png', 'adelaidemap');
    addMap(this.track, '../assets/images/algarvemap.png', 'algarvemap');
    addMap(this.track, '../assets/images/brandshatchmap.png', 'brandshatchmap');
    addMap(this.track, '../assets/images/catalunyamap.png', 'catalunyamap');
    addMap(this.track, '../assets/images/detroitmap.png', 'detroitmap');

    this.container.appendChild(this.track);
    this.maps = [...document.querySelectorAll('.maps-slider-item')];
    for (let i = 0; i < this.maps.length; i += 1) {
      this.maps[i].addEventListener('click', (event) => {
        const map = event.target.getAttribute('data-map');
        this.startGame(map);
      });
    }
  }

  createButtons() {
    this.btnContainer = document.createElement('div');
    this.btnPrev = document.createElement('button');
    this.btnNext = document.createElement('button');

    this.btnContainer.classList.add('maps-slider-buttons');
    this.btnPrev.classList.add('maps-btn-prev', 'btn', 'btn-primary');
    this.btnNext.classList.add('maps-btn-next', 'btn', 'btn-primary');

    this.btnNext.textContent = 'NEXT';
    this.btnPrev.textContent = 'PREV';

    this.wrapper = document.querySelector('.maps-slider-wrapper');

    this.wrapper.appendChild(this.btnContainer);
    this.btnContainer.appendChild(this.btnPrev);
    this.btnContainer.appendChild(this.btnNext);
  }

  carousel() {
    this.createButtons();
    this.position = 0;
    this.sliderToShow = 1;
    this.sliderToScroll = 1;
    this.container = document.querySelector('.maps-slider-container');
    this.track = document.querySelector('.maps-slider-track');
    this.btnPrev = document.querySelector('.maps-btn-prev');
    this.btnNext = document.querySelector('.maps-btn-next');
    this.maps = [...document.querySelectorAll('.maps-slider-item')];
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
    this.quitBtn = document.createElement('button');
    this.quitBtn.classList.add('btn', 'btn-primary', 'quit-from-select-map');
    this.quitBtn.textContent = 'QUIT';
    this.wrapper.appendChild(this.quitBtn);
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
