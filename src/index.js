import Phaser from 'phaser';
import BootScene from './scripts/scenes/BootScene';
import PreloadScene from './scripts/scenes/PreloadScene';
import GameScene from './scripts/scenes/GameScene';
import StartScene from './scripts/scenes/StartScene';
import SettingsScene from './scripts/scenes/SettingsScene';
import SelectMapScene from './scripts/scenes/SelectMapScene';
import SelectCarScene from './scripts/scenes/SelectCarScene';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [BootScene, PreloadScene, StartScene, SettingsScene, SelectMapScene, SelectCarScene, GameScene],
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

const game = new Phaser.Game(config);

// document.addEventListener('keydown', function(event) {
//   if (event.code == 'Escape') {
//     game.scene.start('Start');
//     console.log('escape')
//   }
// });
