import Phaser from 'phaser';
import LoadingBar from '../classes/LoadingBar';
import tilesetPng from '../../assets/images/tileset.png';
import tilemapJson from '../../assets/images/tilemap.json';
import objectsPng from '../../assets/images/objects.png';
import objectsJson from '../../assets/images/objects.json';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
    this.LoadingBar = new LoadingBar(this);
    // this.load.audio('game', '../../assets/sounds/galvanize.mp3');
    this.load.audio('game', '../../assets/sounds/theme.mp3');
    this.load.spritesheet('tileset', tilesetPng, { frameWidth: 64, frameHeight: 64 });
    this.load.tilemapTiledJSON('tilemap', tilemapJson);
    this.load.atlas('objects', objectsPng, objectsJson);
    this.load.image('settings', '../../assets/images/settings.jpg');
  }

  create() {
    this.scene.start('Start');
  }
}
