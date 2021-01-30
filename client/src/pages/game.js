import Phaser from 'phaser';
import BootScene from '../scenes/BootScene';
import PreloadScene from '../scenes/PreloadScene';
import GameScene from '../scenes/GameScene';
import StartScene from '../scenes/StartScene';
import SettingsScene from '../scenes/SettingsScene';
import SelectMapScene from '../scenes/SelectMapScene';
import SelectCarScene from '../scenes/SelectCarScene';
import StatisticsScene from '../scenes/StatisticsScene';
import creditsScene from '../scenes/creditsScene';
import { routes, sendRequest } from '../utils';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: 'CanvasDiv',
  dom: {
    createContainer: true,
  },
  scene: [
    BootScene,
    PreloadScene,
    StartScene,
    SettingsScene,
    StatisticsScene,
    SelectMapScene,
    SelectCarScene,
    GameScene,
    creditsScene,
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'matter',
    matter: {
      gravity: { x: 0, y: 0 },
    },
  },
};

document.addEventListener('DOMContentLoaded', () => {
  sendRequest(routes.user.checkToken, { method: 'GET' }).then(() => {
    const game = new Phaser.Game(config);
  });
});
