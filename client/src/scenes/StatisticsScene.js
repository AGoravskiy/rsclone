import Phaser from 'phaser';
import { changeGameResultByMap, createGameResult, createTitle } from '../utils/simpleFunc/tableFunc';
import { LOCAL_STORAGE_KEY, routes, sendRequest } from '../utils';

export default class Statistics extends Phaser.Scene {
  constructor() {
    super('Statistics');
  }

  create() {
    this.quit();
    this.showStat();
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
      this.statisticsWrapper = document.querySelector('.section-wrapper');
      this.statisticsWrapper.classList.remove('active');

      this.statisticsBg = document.querySelector('.body-background');
      this.statisticsBg.classList.remove('active');
      this.scene.start('Start');
    });
  }

  showStat() {
    this.getStatBtn = document.querySelector('.get-stat-btn');
    this.getStatBtn.addEventListener('click', () => {
      this.getStat();
    });
  }

  getStat() {
    this.statWrapper = document.querySelector('.statistics-results');
    this.statWrapper.innerHTML = '';
    createTitle(this.statWrapper);
    this.statResult = document.createElement('div');
    this.statResult.classList.add('stat-result');
    this.email = localStorage.getItem(LOCAL_STORAGE_KEY.email);
    const options = {
      method: 'GET',
    };
    sendRequest(routes.scores, options).then((data) => {
      const filteredData = data.filter((user) => user.games.length > 0);
      console.log(filteredData);
      filteredData.forEach((user) => {
        const nickname = user.name;
        const { games } = user;
        createGameResult(nickname, games, this.statResult);
      });
    });
    this.statWrapper.appendChild(this.statResult);
    changeGameResultByMap();
  }
}
