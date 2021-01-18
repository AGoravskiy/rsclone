import Phaser from 'phaser';
import LoadingBar from '../classes/LoadingBar';
import tilesetPng from '../../assets/images/spritesheet_tiles.png';
// import tilemapJson from '../../assets/images/adelaidemap.json';
import adelaidemap from '../../assets/images/adelaidemap.json';
import algarvemap from '../../assets/images/algarvemap.json';
import catalunyamap from '../../assets/images/catalunyamap.json';
import brandshatchmap from '../../assets/images/brandshatchmap.json';
import detroitmap from '../../assets/images/detroitmap.json';

import objectsPng from '../../assets/images/objects2.png';
import objectsJson from '../../assets/images/objects2.json';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
    this.LoadingBar = new LoadingBar(this);
    this.load.audio('menu', '../../assets/sounds/theme.mp3');
    this.load.audio('roar', '../../assets/sounds/roar.mp3');
    this.load.audio('motor', '../../assets/sounds/motor.mp3');
    this.load.spritesheet('tileset', tilesetPng, { frameWidth: 64, frameHeight: 64 });
    // this.load.tilemapTiledJSON('tilemap', tilemapJson);
    this.load.tilemapTiledJSON('adelaidemap', adelaidemap);
    this.load.tilemapTiledJSON('algarvemap', algarvemap);
    this.load.tilemapTiledJSON('catalunyamap', catalunyamap);
    this.load.tilemapTiledJSON('brandshatchmap', brandshatchmap);
    this.load.tilemapTiledJSON('detroitmap', detroitmap);

    this.load.atlas('objects', objectsPng, objectsJson);
    this.load.image('settings', '../../assets/images/settings.jpg');
  }

  create() {
    this.scene.start('Start');
  }
}
