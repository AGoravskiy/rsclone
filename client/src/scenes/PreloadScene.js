import Phaser from 'phaser';
import LoadingBar from '../classes/LoadingBar';
import tilesetPng from '../../assets/images/spritesheet_tiles.png';
import adelaidemap from '../../assets/images/adelaidemap.json';
import algarvemap from '../../assets/images/algarvemap.json';
import catalunyamap from '../../assets/images/catalunyamap.json';
import brandshatchmap from '../../assets/images/brandshatchmap.json';
import detroitmap from '../../assets/images/detroitmap.json';
import objectsPng from '../../assets/images/objects.png';
import objectsJson from '../../assets/images/objects.json';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.LoadingBar = new LoadingBar(this);
    this.load.audio('track1', '../../assets/sounds/track-1.mp3');
    this.load.audio('track2', '../../assets/sounds/track-2.mp3');
    this.load.audio('track3', '../../assets/sounds/track-3.mp3');
    this.load.audio('track4', '../../assets/sounds/track-4.mp3');
    this.load.audio('track5', '../../assets/sounds/track-5.mp3');
    this.load.audio('track6', '../../assets/sounds/track-6.mp3');
    this.load.audio('track7', '../../assets/sounds/track-7.mp3');
    this.load.audio('track8', '../../assets/sounds/track-8.mp3');
    this.load.audio('track9', '../../assets/sounds/track-9.mp3');
    this.load.audio('track10', '../../assets/sounds/track-10.mp3');
    this.load.audio('motor', '../../assets/sounds/motorloop.mp3');
    this.load.spritesheet('tileset', tilesetPng, { frameWidth: 64, frameHeight: 64 });

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
