import Phaser from 'phaser';
import Client from '../classes/Client';

const carProperty = {
  car_black_1: {
    MAXSPEED: 4,
    ACCELERATION: 0.6,
    SLIDE_ANGLE: 2.5,
    NITROGEN: 1.4,
    NAME: 'Koenigsegg Agera RS',
  },
  car_blue_1: {
    MAXSPEED: 5,
    ACCELERATION: 0.9,
    SLIDE_ANGLE: 3,
    NITROGEN: 1.5,
    NAME: 'Bugatti Veyron Super Sport',
  },
  car_red_1: {
    MAXSPEED: 6,
    ACCELERATION: 1.2,
    SLIDE_ANGLE: 3.5,
    NITROGEN: 1.6,
    NAME: 'Hennessey Venom GT',
  },
  car_green_1: {
    MAXSPEED: 7,
    ACCELERATION: 1.5,
    SLIDE_ANGLE: 4,
    NITROGEN: 1.7,
    NAME: 'SSC Ultimate Aero TT',
  },
  car_yellow_1: {
    MAXSPEED: 8,
    ACCELERATION: 1.8,
    SLIDE_ANGLE: 4.5,
    NITROGEN: 1.8,
    NAME: 'McLaren F1',
  },
};

export default class SelectCarScene extends Phaser.Scene {
  constructor() {
    super('SelectCar');
    this.carProperty = carProperty;
  }

  init(data) {
    this.map = data.map;
    this.laps = data.laps;
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
    this.container = document.querySelector('.cars-slider-container');
    this.track = document.createElement('div');
    this.track.classList.add('cars-slider-track');

    function addCar(parent, path) {
      const carModel = path.substr(0, path.length - 4);

      const carItem = document.createElement('div');
      carItem.classList.add('cars-slider-item');
      carItem.dataset.car = carModel;

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('car-image-container');
      const carImage = document.createElement('img');
      const carName = document.createElement('p');
      carName.classList.add('car-name');
      carName.textContent = `${carProperty[carModel].NAME}`;
      carImage.setAttribute('src', `../../assets/cars/${path}`);
      imageContainer.appendChild(carName);
      imageContainer.appendChild(carImage);

      const carProps = document.createElement('div');
      carProps.classList.add('car-parameters');

      function createProp(mainDiv, prop, max, name) {
        const propPercent = (prop / max) * 100;
        const carProp = document.createElement('div');
        carProp.classList.add('car-parameter-container');
        const carPropName = document.createElement('p');
        carPropName.textContent = ` ${name} : ${propPercent}`;
        const progressContainer = document.createElement('div');
        progressContainer.classList.add('progress-container');

        const span0 = document.createElement('span');
        span0.textContent = '0';
        const span100 = document.createElement('span');
        span100.textContent = '100';

        const progressBox = document.createElement('div');
        progressBox.classList.add('progress-box');
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBar.style.width = `${propPercent}%`;
        progressBar.textContent = `${propPercent}`;

        progressContainer.appendChild(span0);
        progressContainer.appendChild(progressBox);
        progressContainer.appendChild(span100);
        progressBox.appendChild(progressBar);
        carProp.append(carPropName);
        carProp.appendChild(progressContainer);
        mainDiv.appendChild(carProp);
      }
      createProp(carProps, carProperty[carModel].MAXSPEED, 10, 'MAX SPEED');
      createProp(carProps, carProperty[carModel].ACCELERATION, 2, 'ACCELERATION');
      createProp(carProps, carProperty[carModel].SLIDE_ANGLE, 5, 'ROTATION');
      createProp(carProps, carProperty[carModel].NITROGEN, 2, 'NITROGEN OXIDE');

      carItem.append(imageContainer);
      carItem.append(carProps);
      parent.append(carItem);
    }

    addCar(this.track, 'car_black_1.png');
    addCar(this.track, 'car_blue_1.png');
    addCar(this.track, 'car_green_1.png');
    addCar(this.track, 'car_red_1.png');
    addCar(this.track, 'car_yellow_1.png');
    this.container.appendChild(this.track);
    for (const item of this.track.childNodes) {
      item.addEventListener('click', (event) => {
        this.startGame(item.getAttribute('data-car'), this.carProperty[item.getAttribute('data-car')], this.map);
        this.carsBg = document.querySelector('.cars-background');
        this.carsBg.classList.remove('active');

        this.carsSlider = document.querySelector('.cars-slider-wrapper');
        this.carsSlider.classList.remove('active-block');
      });
    }
  }

  createButtons() {
    this.btnContainer = document.createElement('div');
    this.btnPrev = document.createElement('button');
    this.btnNext = document.createElement('button');

    this.btnContainer.classList.add('cars-slider-buttons');
    this.btnPrev.classList.add('cars-btn-prev', 'btn', 'btn-primary');
    this.btnNext.classList.add('cars-btn-next', 'btn', 'btn-primary');

    this.btnNext.textContent = 'NEXT';
    this.btnPrev.textContent = 'PREV';

    this.wrapper = document.querySelector('.cars-slider-wrapper');

    this.wrapper.appendChild(this.btnContainer);
    this.btnContainer.appendChild(this.btnPrev);
    this.btnContainer.appendChild(this.btnNext);
  }

  carousel() {
    this.createButtons();
    this.position = 0;
    this.sliderToShow = 1;
    this.sliderToScroll = 1;
    this.cars = [...document.querySelectorAll('.cars-slider-item')];
    this.carsCount = this.cars.length;
    this.carsWidth = this.container.clientWidth / this.sliderToShow;
    this.movePosition = this.sliderToScroll * this.carsWidth;

    for (let i = 0; i < this.cars.length; i += 1) {
      this.cars[i].style.minWidth = `${this.carsWidth}px`;
    }

    this.btnNext.addEventListener('click', () => {
      const carsLeft = this.carsCount
      - (Math.abs(this.position) + this.sliderToShow * this.carsWidth)
      / this.carsWidth;
      this.position -= carsLeft >= this.sliderToScroll
        ? this.movePosition
        : this.carsLeft * this.carsWidth;

      this.setPosition();
      this.checkBtns();
    });

    this.btnPrev.addEventListener('click', () => {
      const carsLeft = Math.abs(this.position) / this.carsWidth;
      this.position += carsLeft >= this.sliderToScroll
        ? this.movePosition
        : this.carsLeft * this.carsWidth;

      this.setPosition();
      this.checkBtns();
    });
  }

  setPosition() {
    this.track.style.transform = `translatex(${this.position}px)`;
  }

  checkBtns() {
    this.btnPrev.disabled = this.position === 0;
    this.btnNext.disabled = this.position <= -(this.carsCount - this.sliderToShow) * this.carsWidth;
  }

  quit() {
    this.quitBtn = document.createElement('button');
    this.quitBtn.classList.add('btn', 'btn-primary', 'quit-from-select-car');
    this.quitBtn.textContent = 'QUIT';
    this.wrapper.appendChild(this.quitBtn);
    this.quitBtn.addEventListener('click', () => {
      this.carsBg = document.querySelector('.cars-background');
      this.carsBg.classList.remove('active');

      this.carsSlider = document.querySelector('.cars-slider-wrapper');
      this.carsSlider.classList.remove('active-block');
      this.scene.start('SelectMapScene');

      this.mapsBg = document.querySelector('.maps-background');
      this.mapsBg.classList.add('active');

      this.mapsSlider = document.querySelector('.maps-slider-wrapper');
      this.mapsSlider.classList.add('active-block');
    });
  }

  startGame(car, carProperty, map) {
    this.scene.start('Game', {
      client: this.client, car, carProperty, map,
      laps: this.laps,
    });
  }
}
