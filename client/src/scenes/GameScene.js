import Phaser from 'phaser';
import Map from '../classes/Map';
import Player from '../classes/Player';
import Stats from '../classes/Stats';
import StatsPanel from '../classes/StatsPanel';
import StatsPopup from '../classes/StatsPopup';

const LAPS = 5;
const CARS = {
  BLUE: {
    sprite: 'car_blue_1',
    position: 'player',
    carProperty: {
      MAXSPEED: 5,
      ACCELERATION: 0.9,
      SLIDE_ANGLE: 3,
      NITROGEN: 1.5,
      NAME: 'Bugatti Veyron Super Sport',
    },

  },
  RED: {
    sprite: 'car_red_1',
    position: 'enemy',
    carProperty: {
      MAXSPEED: 6,
      ACCELERATION: 1.2,
      SLIDE_ANGLE: 3.5,
      NITROGEN: 1.6,
      NAME: 'Hennessey Venom GT',
    },

  },
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  // метод который вызывается в начале, при старте сцены
  init(data) {
    this.mapa = data.map;
    if (data.client) {
      this.client = data.client;
    }
    if (data.carProperty) {
      this.carProperty = data.carProperty;
    }
    if (data.car) {
      this.carmodel = data.car;
    }
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  /*
  preload() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }
*/
  getCarsConfig() {
    if (this.carmodel) {
      CARS.BLUE.sprite = this.carmodel;
      CARS.BLUE.carProperty = this.carProperty;
    }

    let config = {
      player: CARS.BLUE,
      enemy: CARS.RED,
    };
    if (this.client && !this.client.master) {
      config = {
        player: CARS.RED,
        enemy: CARS.BLUE,
      };
    }
    return config;
  }

  create() {
    this.esc = this.input.keyboard.addKey('ESC');
    this.esc.on('down', function (event) {
      this.scene.pause();
      this.scene.launch('Start');
      // if(this.isPause){
      //   console.log("resume")
      //   this.scene.resume();
      //   this.isPause = false;
      // }
      // else{
      //   console.log("pause")
      //   this.scene.pause();
      //   this.scene.start('Start');
      //   this.isPause = true;
      // }
    }, this);

    this.motor = this.sound.add('motor');
    this.motor.loop = true;
    this.keyUp = this.input.keyboard.addKey('up');
    this.keyUp.on('down', function (event) {
      this.motor.play();
    }, this);
    this.keyUp.on('up', function (event) {
      this.motor.stop();
    }, this);

    this.soundPlay();
    this.map = new Map(this, this.mapa);

    const car = this.getCarsConfig();

    this.player = new Player(this, this.map, car.player, CARS.BLUE.carProperty);
    if (this.client) {
      this.enemy = new Player(this, this.map, car.enemy, CARS.RED.carProperty);
      this.client.on('data', (data) => {
        this.enemy.car.setX(data.x);
        this.enemy.car.setY(data.y);
        this.enemy.car.setAngle(data.angle);
      });
    }
    this.stats = new Stats(this, LAPS);
    this.StatsPanel = new StatsPanel(this, this.stats);
    this.cameras.main.setBounds(0, 0,
      this.map.tilemap.widthInPixels,
      this.map.tilemap.heightInPixels);
    this.cameras.main.startFollow(this.player.car);

    this.player.car.on('lap', this.onLapComplete, this);
    this.matter.world.on('collisionactive', (event, a, b) => {
      if (b.gameObject === this.player.car && a.gameObject.frame.name === 'oil') {
        this.player.slide();
      }
    });
    // setEvents() {
    //   // this.onePlayerBtn.on('pointerdown', this.selectMap, this);
    //   // this.twoPlayerBtn.on('pointerdown', this.requestGame, this);
    //   // this.settingsBtn.on('pointerdown', this.selectSettings, this);
    //   // this.statisticsBtn.on('pointerdown', this.viewStatistics, this);
    //   this.scene.cursors.left.isDown{
    //     console.log('press left');
    //   }
    // }
  }

  soundPlay() {
    this.localVolume = +localStorage.getItem('volume');
    this.sound.play('game', {
      volume: this.localVolume * 0.01,
      loop: true,
    });
  }

  onLapComplete(lap) {
    this.stats.onLapComplete();
    if (this.stats.complete) {
      this.StatsPopup = new StatsPopup(this, this.stats);
    }
  }

  // вызывается много раз в секунду обновляя состояние сцены
  update(time, dt) {
    this.stats.update(dt);
    this.StatsPanel.render();
    this.player.move();
    this.sync();
  }

  sync() {
    if (this.client) {
      this.client.send({
        x: this.player.car.x,
        y: this.player.car.y,
        angle: this.player.car.angle,
      });
    }
  }
}
