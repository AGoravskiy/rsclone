import Phaser from 'phaser';
import LoadingBar from '../classes/LoadingBar';
import tilesetPng from '../../assets/tileset.png';
import tilemapJson from '../../assets/tilemap.json';
import objectsPng from '../../assets/objects.png';
import objectsJson from '../../assets/objects.json';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
    this.LoadingBar = new LoadingBar(this);
    this.load.spritesheet('tileset', tilesetPng, { frameWidth: 64, frameHeight: 64 });
    this.load.tilemapTiledJSON('tilemap', tilemapJson);
    this.load.atlas('objects', objectsPng, objectsJson);
  }

  create() {
    this.scene.start('Start');
  }
}
