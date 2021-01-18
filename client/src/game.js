import Phaser from 'phaser';
import BootScene from './scripts/scenes/BootScene';
import PreloadScene from './scripts/scenes/PreloadScene';
import GameScene from './scripts/scenes/GameScene';
import StartScene from './scripts/scenes/StartScene';
import SettingsScene from './scripts/scenes/SettingsScene';
import SelectMapScene from './scripts/scenes/SelectMapScene';
import SelectCarScene from './scripts/scenes/SelectCarScene';
import StatisticsScene from './scripts/scenes/StatisticsScene';
import LoginScene from './scripts/scenes/LoginScene';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [BootScene,
    LoginScene,
    PreloadScene,
    StartScene,
    SettingsScene,
    StatisticsScene,
    SelectMapScene,
    SelectCarScene,
    GameScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: { x: 0, y: 0 },
    },
  },
};

export default function startGame() {
  const game = new Phaser.Game(config);
}
