import Phaser from 'phaser';
import { createGameResult, createTitle } from '../utils/simpleFunc/tableFunc';
import { routes, sendRequest } from '../utils';
import {
  startSceneLang, refreshButtonLang, backButtonLang, statisticsSceneLang,
} from '../utils/itemDescription';

export default class Statistics extends Phaser.Scene {
  constructor() {
    super('Statistics');
  }

  create() {
    if (localStorage.getItem('language')) {
      this.lang = localStorage.getItem('language');
    } else {
      this.lang = 'english';
    }
    this.mainTitle = document.querySelector('.section-title');
    this.mainTitle.innerHTML = `${startSceneLang.statistics[this.lang]}`;
    this.createTable();
    this.getStat('all');
    this.showStat();
    this.quit();
  }

  createTable() {
    this.statWrapper = document.querySelector('.statistics-results');
    this.statWrapper.innerHTML = '';
    createTitle(this.statWrapper, this.lang);
    this.dropDown = document.querySelector('.all-maps-parameter');
    this.dropDown.innerHTML = statisticsSceneLang.allTracks[this.lang];
    this.statResult = document.createElement('div');
    this.statResult.classList.add('stat-result');
    this.statWrapper.appendChild(this.statResult);
  }

  quit() {
    this.quitBtn = document.querySelector('.back-button');
    this.quitBtn.innerHTML = `${backButtonLang[this.lang]}`;
    this.quitBtn.addEventListener('click', () => {
      this.statisticsWrapper = document.querySelector('.section-wrapper');
      this.statisticsWrapper.classList.remove('active');

      this.statisticsBg = document.querySelector('.stats-background');
      this.statisticsBg.classList.remove('active');
      this.scene.start('Start');
    });
  }

  showStat() {
    this.getStatBtn = document.querySelector('.get-stat-btn');
    this.getStatBtn.innerHTML = `${refreshButtonLang[this.lang]}`;
    this.getStatBtn.addEventListener('click', () => {
      this.getStat();
    });
    this.select = document.getElementById('select-map');
    this.select.addEventListener('change', (event) => {
      this.getStat(event.target.value);
    });
  }

  getStat(selectedMap) {
    this.statResult.innerHTML = '';
    const options = {
      method: 'GET',
    };
    sendRequest(routes.scores, options).then((data) => {
      const filteredData = data.filter((user) => user.games.length > 0);
      filteredData.forEach((user) => {
        const nickname = user.name;
        const { games } = user;
        createGameResult(nickname, games, this.statResult, 'map', selectedMap);
      });
    });
  }
}
