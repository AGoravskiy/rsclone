/* eslint-disable object-property-newline */
import Phaser from 'phaser';
import Client from '../classes/Client';
import {
  carData, carMainTitleLang, carPropertyLang, carProperty, backButtonLang, selectButtonLang,
} from '../utils/itemDescription';

export default class SelectCarScene extends Phaser.Scene {
  constructor() {
    super('SelectCar');
    this.carProperty = carProperty;
  }

  init(data) {
    if (localStorage.getItem('language')) {
      this.lang = localStorage.getItem('language');
    } else {
      this.lang = 'english';
    }
    this.map = data.map;
    this.laps = data.laps;
    this.lapsContainer = data.lapsContainer;
  }

  create() {
    this.carPageWrapper = document.querySelector('.car-page-wrapper');
    if (this.carPageWrapper.firstChild) {
      while (this.carPageWrapper.firstChild) {
        this.carPageWrapper.removeChild(this.carPageWrapper.firstChild);
      }
    }
    this.createBtnPrev(this.carPageWrapper);
    this.createCarWrapper(this.carPageWrapper);
    this.createMainTitle(this.carWrapper, carMainTitleLang[this.lang]);
    this.createSlider(this.carWrapper, this.lang);
    this.createButtonsBlock(this.carWrapper);
    this.createBtnNext(this.carPageWrapper);
    this.carousel();
    this.checkBtns();
    this.createCarIllustrationWrapper(this.carPageWrapper);
  }

  createCarWrapper(mainDiv) {
    this.carWrapper = document.createElement('div');
    this.carWrapper.classList.add('car-wrapper');
    mainDiv.appendChild(this.carWrapper);
  }

  createCarIllustrationWrapper(mainDiv) {
    this.IllustrationWrapper = document.createElement('div');
    this.IllustrationWrapper.classList.add('car-illustration-wrapper');
    mainDiv.appendChild(this.IllustrationWrapper);
  }

  createBtnPrev(mainDiv) {
    this.btnPrev = document.createElement('button');
    this.btnPrev.classList.add('arrow', 'car-btn-prev');
    this.btnPrev.innerHTML = '&lt;';
    mainDiv.appendChild(this.btnPrev);
  }

  createBtnNext(mainDiv) {
    this.btnNext = document.createElement('button');
    this.btnNext.classList.add('arrow', 'car-btn-next');
    this.btnNext.innerHTML = '&gt;';
    mainDiv.appendChild(this.btnNext);
  }

  createMainTitle(mainDiv, content) {
    this.mainTitle = document.createElement('h1');
    this.mainTitle.classList.add('track-title');
    this.mainTitle.textContent = content;
    mainDiv.appendChild(this.mainTitle);
  }

  createButtonsBlock(mainDiv) {
    this.buttonsBlock = document.createElement('div');
    this.buttonsBlock.classList.add('buttons-block');
    this.createBackButton(this.buttonsBlock, `${backButtonLang[this.lang]}`);
    this.createSelectButton(this.buttonsBlock, `${selectButtonLang[this.lang]}🏁`);
    mainDiv.appendChild(this.buttonsBlock);
  }

  createBackButton(mainDiv, content) {
    this.backButton = document.createElement('button');
    this.backButton.classList.add('section-button');
    this.backButton.textContent = content;
    mainDiv.appendChild(this.backButton);
    this.backButton.addEventListener('click', () => {
      this.carPageWrapper.classList.remove('active');
      this.scene.start('SelectMapScene');
      this.mapPageWrapper = document.querySelector('.map-page-wrapper');
      this.mapPageWrapper.classList.add('active');
    });
  }

  createSelectButton(mainDiv, content) {
    this.selectButton = document.createElement('button');
    this.selectButton.classList.add('section-button');
    this.selectButton.textContent = content;
    mainDiv.appendChild(this.selectButton);

    this.selectButton.addEventListener('click', () => {
      const selectedCar = carData[this.carDataNum];
      this.carPageWrapper.classList.remove('active');
      this.startGame(selectedCar,
        this.carProperty[selectedCar],
        this.map);
    });
  }

  createCarHeader(mainDiv, content, src) {
    this.carHeader = document.createElement('div');
    this.carHeader.classList.add('car-header');
    this.createCarName(this.carHeader, content);
    this.createCarImage(this.carHeader, src);
    mainDiv.appendChild(this.carHeader);
  }

  createCarName(mainDiv, content) {
    this.carName = document.createElement('h2');
    this.carName.classList.add('track-header-title');
    this.carName.textContent = content;
    mainDiv.appendChild(this.carName);
  }

  createCarImage(mainDiv, src) {
    this.carImage = document.createElement('img');
    this.carImage.classList.add('car-img');
    this.carImage.setAttribute('src', `../../assets/cars/${src}`);
    mainDiv.appendChild(this.carImage);
  }

  createCarDescriptionBlock(mainDiv, prop, fullNum, emptyNum) {
    this.carDescriptionBlock = document.createElement('div');
    this.carDescriptionBlock.classList.add('car-description-block');
    this.createCarDescription(this.carDescriptionBlock, prop);
    this.createCarRating(this.carDescriptionBlock, fullNum, emptyNum);
    mainDiv.appendChild(this.carDescriptionBlock);
  }

  createCarDescription(mainDiv, prop) {
    this.carDescription = document.createElement('div');
    this.carDescription.classList.add('car-description');
    this.carDescription.textContent = prop;
    mainDiv.appendChild(this.carDescription);
  }

  createCarRating(mainDiv, fullNum, emptyNum) {
    this.carRating = document.createElement('div');
    this.carRating.classList.add('car-rating');
    this.createRatingFull(this.carRating, fullNum);
    this.createRatingEmpty(this.carRating, emptyNum);
    mainDiv.appendChild(this.carRating);
  }

  createRatingFull(mainDiv, num) {
    for (let i = 0; i < num; i += 1) {
      this.carRatingFull = document.createElement('div');
      this.carRatingFull.classList.add('rating-full');
      mainDiv.appendChild(this.carRatingFull);
    }
  }

  createRatingEmpty(mainDiv, num) {
    for (let i = 0; i < num; i += 1) {
      this.carRatingEmpty = document.createElement('div');
      this.carRatingEmpty.classList.add('rating-empty');
      mainDiv.appendChild(this.carRatingEmpty);
    }
  }

  createSliderItem(mainDiv, content, path,
    full1, empty1, full2, empty2, full3, empty3, full4, empty4) {
    this.carModel = path.substr(0, path.length - 4);
    this.sliderItem = document.createElement('div');
    this.sliderItem.classList.add('cars-slider-item');
    this.sliderItem.dataset.car = this.carModel;
    this.createCarHeader(this.sliderItem, content, path);
    this.createCarDescriptionBlock(this.sliderItem,
      carPropertyLang.MAXSPEED[this.lang],
      full1, empty1);
    this.createCarDescriptionBlock(this.sliderItem,
      carPropertyLang.ACCELERATION[this.lang],
      full2, empty2);
    this.createCarDescriptionBlock(this.sliderItem,
      carPropertyLang.SLIDE_ANGLE[this.lang],
      full3, empty3);
    this.createCarDescriptionBlock(this.sliderItem,
      carPropertyLang.NITROGEN[this.lang],
      full4, empty4);
    mainDiv.appendChild(this.sliderItem);
  }

  createSlider(mainDiv, lang) {
    this.sliderContainer = document.createElement('div');
    this.sliderContainer.classList.add('cars-slider-container');
    this.track = document.createElement('div');
    this.track.classList.add('cars-slider-track');

    this.createSliderItem(this.track, carProperty.car_black_1[lang], 'car_black_1.png', 6, 4, 8, 2, 9, 1, 4, 6);
    this.createSliderItem(this.track, carProperty.car_blue_1[lang], 'car_blue_1.png', 6, 4, 1, 9, 8, 2, 5, 5);
    this.createSliderItem(this.track, carProperty.car_green_1[lang], 'car_green_1.png', 9, 1, 5, 5, 9, 1, 5, 5);
    this.createSliderItem(this.track, carProperty.car_red_1[lang], 'car_red_1.png', 4, 6, 3, 7, 6, 4, 6, 4);
    this.createSliderItem(this.track, carProperty.car_yellow_1[lang], 'car_yellow_1.png', 3, 7, 2, 8, 4, 6, 9, 1);

    this.sliderContainer.appendChild(this.track);
    mainDiv.appendChild(this.sliderContainer);
  }

  carousel() {
    this.btnNext = document.querySelector('.car-btn-next');
    this.btnPrev = document.querySelector('.car-btn-prev');
    this.position = 0;
    this.carDataNum = 0;
    this.sliderToShow = 1;
    this.sliderToScroll = 1;
    this.cars = [...document.querySelectorAll('.cars-slider-item')];
    this.carsCount = this.cars.length;
    this.carsWidth = this.sliderContainer.clientWidth / this.sliderToShow;
    this.movePosition = this.sliderToScroll * this.carsWidth;

    for (let i = 0; i < this.cars.length; i += 1) {
      this.cars[i].style.minWidth = `${this.carsWidth}px`;
    }

    this.btnNext.addEventListener('click', () => {
      const carsLeft = this.carsCount
        - (Math.abs(this.position) + this.sliderToShow * this.carsWidth)
          / this.carsWidth;
      this.position
        -= carsLeft >= this.sliderToScroll
          ? this.movePosition
          : this.carsLeft * this.carsWidth;
      if (this.carDataNum < 5) {
        this.carDataNum += 1;
      }

      this.setPosition();
      this.checkBtns();
    });

    this.btnPrev.addEventListener('click', () => {
      const carsLeft = Math.abs(this.position) / this.carsWidth;
      this.position
        += carsLeft >= this.sliderToScroll
          ? this.movePosition
          : this.carsLeft * this.carsWidth;
      if (this.carDataNum >= 0) {
        this.carDataNum -= 1;
      }

      this.setPosition();
      this.checkBtns();
    });
  }

  setPosition() {
    this.track.style.transform = `translatex(${this.position}px)`;
  }

  checkBtns() {
    if (this.position === 0) {
      this.btnPrev.disabled = true;
      this.btnPrev.style.cursor = 'default';
    } else {
      this.btnPrev.disabled = false;
      this.btnPrev.style.cursor = 'pointer';
    }
    if (this.position <= -(this.carsCount - this.sliderToShow) * this.carsWidth) {
      this.btnNext.disabled = true;
      this.btnNext.style.cursor = 'auto';
    } else {
      this.btnNext.disabled = false;
      this.btnNext.style.cursor = 'pointer';
    }
  }

  startGame(car, carProperty, map) {
    this.carPageWrapper.classList.remove('active');
    const statistics = JSON.parse(localStorage.getItem('statistics'));
    statistics.car = carProperty[this.lang];
    statistics.map = map;
    localStorage.setItem('statistics', JSON.stringify(statistics));
    this.scene.start('Game', {
      client: this.client,
      car,
      carProperty,
      map,
      laps: this.laps,
    });
  }
}
