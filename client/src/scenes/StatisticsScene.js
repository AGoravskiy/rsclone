import Phaser from 'phaser';
import { createGameResult, createTitle } from '../utils/simpleFunc/tableFunc';
import { routes, sendRequest } from '../utils';

export default class Statistics extends Phaser.Scene {
  constructor() {
    super('Statistics');
  }

  create() {
    this.createTable();
    this.getStat('all');
    this.showStat();
    this.quit();
  }

  createTable() {
    this.statWrapper = document.querySelector('.statistics-results');
    this.statWrapper.innerHTML = '';
    createTitle(this.statWrapper);
    this.statResult = document.createElement('div');
    this.statResult.classList.add('stat-result');
    this.statWrapper.appendChild(this.statResult);
  }

  quit() {
    this.quitBtn = document.querySelector('.back-button');
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
