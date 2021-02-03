import Phaser from 'phaser';
import {
  mapsDescription, mapData, selectButtonLang, backButtonLang, wordLaps, mapMainTitleLang,
} from '../utils/itemDescription';

export default class SelectMapScene extends Phaser.Scene {
  constructor() {
    super('SelectMap');
  }

  init() {
    if (localStorage.getItem('language')) {
      this.lang = localStorage.getItem('language');
    } else {
      this.lang = 'english';
    }
  }

  create() {
    this.mapPageWrapper = document.querySelector('.map-page-wrapper');
    if (this.mapPageWrapper.firstChild) {
      while (this.mapPageWrapper.firstChild) {
        this.mapPageWrapper.removeChild(this.mapPageWrapper.firstChild);
      }
    }
    this.createBtnPrev(this.mapPageWrapper);
    this.createMapWrapper(this.mapPageWrapper);
    this.createMainTitle(this.mapWrapper, mapMainTitleLang[this.lang]);
    this.createSlider(this.mapWrapper);
    this.createSelectLaps(this.mapWrapper);
    this.createButtonsBlock(this.mapWrapper);
    this.createBtnNext(this.mapPageWrapper);
    this.carousel();
    this.checkBtns();
    this.createMapIllustrationWrapper(this.mapPageWrapper);
  }

  createMapWrapper(mainDiv) {
    this.mapWrapper = document.createElement('div');
    this.mapWrapper.classList.add('map-wrapper');
    mainDiv.appendChild(this.mapWrapper);
  }

  createMapIllustrationWrapper(mainDiv) {
    this.IllustrationWrapper = document.createElement('div');
    this.IllustrationWrapper.classList.add('map-illustration-wrapper');
    mainDiv.appendChild(this.IllustrationWrapper);
  }

  createBtnPrev(mainDiv) {
    this.btnPrev = document.createElement('button');
    this.btnPrev.classList.add('arrow', 'map-btn-prev');
    this.btnPrev.innerHTML = '&lt;';
    mainDiv.appendChild(this.btnPrev);
  }

  createBtnNext(mainDiv) {
    this.btnNext = document.createElement('button');
    this.btnNext.classList.add('arrow', 'map-btn-next');
    this.btnNext.innerHTML = '&gt;';
    mainDiv.appendChild(this.btnNext);
  }

  createMainTitle(mainDiv, content) {
    this.mainTitle = document.createElement('h1');
    this.mainTitle.classList.add('track-title');
    this.mainTitle.textContent = content;
    mainDiv.appendChild(this.mainTitle);
  }

  createSlider(mainDiv) {
    this.sliderContainer = document.createElement('div');
    this.sliderContainer.classList.add('maps-slider-container');
    this.track = document.createElement('div');
    this.track.classList.add('maps-slider-track');

    this.createSliderItem(this.track, 'adelaidemap', mapsDescription.adelaidemap.english, '../assets/images/adelaidemap.png');
    this.createSliderItem(this.track, 'algarvemap', mapsDescription.adelaidemap.english, '../assets/images/algarvemap.png');
    this.createSliderItem(this.track, 'brandshatchmap', mapsDescription.adelaidemap.english, '../assets/images/brandshatchmap.png');
    this.createSliderItem(this.track, 'catalunyamap', mapsDescription.adelaidemap.english, '../assets/images/catalunyamap.png');
    this.createSliderItem(this.track, 'detroitmap', mapsDescription.adelaidemap.english, '../assets/images/detroitmap.png');

    this.sliderContainer.appendChild(this.track);
    mainDiv.appendChild(this.sliderContainer);
    this.maps = [...document.querySelectorAll('.maps-slider-item')];
  }

  createSliderItem(mainDiv, mapName, description, src) {
    this.sliderItem = document.createElement('div');
    this.sliderItem.classList.add('maps-slider-item');
    this.sliderItem.setAttribute('data-map', `${mapName}`);
    this.createMapInfo(this.sliderItem, mapName, description);
    this.createMapImage(this.sliderItem, src);
    mainDiv.appendChild(this.sliderItem);
  }

  createMapInfo(mainDiv, mapName, description) {
    this.mapInfo = document.createElement('div');
    this.mapInfo.classList.add('track-info');
    this.createMapName(this.mapInfo, mapName);
    this.createMapDescription(this.mapInfo, description);
    mainDiv.appendChild(this.mapInfo);
  }

  createMapName(mainDiv, mapName) {
    this.mapName = document.createElement('h2');
    this.mapName.classList.add('track-header-title');
    this.mapName.textContent = mapName;
    mainDiv.appendChild(this.mapName);
  }

  createMapDescription(mainDiv, description) {
    this.mapDescription = document.createElement('p');
    this.mapDescription.classList.add('map-description');
    this.mapDescription.textContent = description;
    mainDiv.appendChild(this.mapDescription);
  }

  createMapImage(mainDiv, src) {
    this.mapImage = document.createElement('img');
    this.mapImage.classList.add('track-illustration');
    this.mapImage.setAttribute('src', `${src}`);
    mainDiv.appendChild(this.mapImage);
  }

  createSelectLaps(mainDiv) {
    this.selectLapsContainer = document.createElement('div');
    this.selectLapsContainer.classList.add('track-header');
    this.createSelectLapsWord(this.selectLapsContainer, `${wordLaps[this.lang]}`, 'lap-number-title');
    this.createSelectLapsBtnLess(this.selectLapsContainer, '-', 'lap-number-title');
    this.createSelectLapsCount(this.selectLapsContainer, '5', 'lap-number-title');
    this.createSelectLapsBtnMore(this.selectLapsContainer, '+', 'lap-number-title');
    mainDiv.appendChild(this.selectLapsContainer);
  }

  createSelectLapsWord(mainDiv, content, style) {
    this.selectLapsWord = document.createElement('h2');
    this.selectLapsWord.classList.add(style);
    this.selectLapsWord.textContent = content;
    mainDiv.appendChild(this.selectLapsWord);
  }

  createSelectLapsBtnLess(mainDiv, content, style) {
    this.selectLapsBtnLess = document.createElement('h2');
    this.selectLapsBtnLess.classList.add(style);
    this.selectLapsBtnLess.textContent = content;
    this.selectLapsBtnLess.style.cursor = 'pointer';
    mainDiv.appendChild(this.selectLapsBtnLess);

    this.selectLapsBtnLess.addEventListener('click', () => {
      if (this.lapsCount.textContent > 1) {
        this.lapsCount.textContent = +this.lapsCount.textContent - 1;
        this.lapsCount.textContent += '';
        this.laps = +this.lapsCount.textContent;
      }
    });
  }

  createSelectLapsBtnMore(mainDiv, content, style) {
    this.selectLapsBtnMore = document.createElement('h2');
    this.selectLapsBtnMore.classList.add(style);
    this.selectLapsBtnMore.textContent = content;
    this.selectLapsBtnMore.style.cursor = 'pointer';
    mainDiv.appendChild(this.selectLapsBtnMore);

    this.selectLapsBtnMore.addEventListener('click', () => {
      this.lapsCount.textContent = +this.lapsCount.textContent + 1;
      this.lapsCount.textContent += '';
      this.laps = +this.lapsCount.textContent;
    });
  }

  createSelectLapsCount(mainDiv, content, style) {
    this.lapsCount = document.createElement('h2');
    this.lapsCount.classList.add(style);
    this.lapsCount.textContent = content;
    mainDiv.appendChild(this.lapsCount);
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
      this.mapPageWrapper.classList.remove('active');
      this.scene.start('Start');
    });
  }

  createSelectButton(mainDiv, content) {
    this.selectButton = document.createElement('button');
    this.selectButton.classList.add('section-button');
    this.selectButton.textContent = content;
    mainDiv.appendChild(this.selectButton);

    this.selectButton.addEventListener('click', () => {
      this.mapPageWrapper.classList.remove('active');
      this.startGame(mapData[this.mapDataNum]);
    });
  }

  carousel() {
    this.btnNext = document.querySelector('.map-btn-next');
    this.btnPrev = document.querySelector('.map-btn-prev');
    this.mapDataNum = 0;
    this.position = 0;
    this.sliderToShow = 1;
    this.sliderToScroll = 1;
    this.maps = [...document.querySelectorAll('.maps-slider-item')];
    this.mapsCount = this.maps.length;
    this.mapsWidth = this.sliderContainer.clientWidth / this.sliderToShow;
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
      if (this.mapDataNum < 5) {
        this.mapDataNum += 1;
      }
      this.setPosition();
      this.checkBtns();
    });

    this.btnPrev.addEventListener('click', () => {
      const mapsLeft = Math.abs(this.position) / this.mapsWidth;
      this.position += mapsLeft >= this.sliderToScroll
        ? this.movePosition
        : this.mapsLeft * this.mapsWidth;
      if (this.mapDataNum >= 0) {
        this.mapDataNum -= 1;
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
    if (this.position <= -(this.mapsCount - this.sliderToShow) * this.mapsWidth) {
      this.btnNext.disabled = true;
      this.btnNext.style.cursor = 'auto';
    } else {
      this.btnNext.disabled = false;
      this.btnNext.style.cursor = 'pointer';
    }
  }

  startGame(map) {
    this.mapPageWrapper.classList.remove('active');
    this.scene.start('SelectCar', {
      client: this.client,
      laps: this.laps,
      map,
    });
    this.carPageWrapper = document.querySelector('.car-page-wrapper');
    this.carPageWrapper.classList.add('active');
  }
}
