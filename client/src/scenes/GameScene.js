import Phaser from 'phaser';
import getDate from '../utils/simpleFunc/dateFunc';
import Map from '../classes/Map';
import Player from '../classes/Player';
import Stats from '../classes/Stats';
import StatsPanel from '../classes/StatsPanel';
import StatsPopup from '../classes/StatsPopup';
import { sendRequest } from '../utils/ajax/sendRequest';
import { LOCAL_STORAGE_KEY } from '../utils/localStorage';
import { routes } from '../utils/routes';

const LAPS = 3;
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
    if (data.laps) {
      this.laps = data.laps;
    } else {
      this.laps = LAPS;
    }
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
    this.w = this.input.keyboard.addKey('W');
    this.s = this.input.keyboard.addKey('S');
    this.a = this.input.keyboard.addKey('A');
    this.d = this.input.keyboard.addKey('D');
    this.link = 'https://nfs-jsu.herokuapp.com/submit-game';
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
    this.input.on('gameobjectdown', function () {
      this.scene.launch('start');
    });
    this.motor = this.sound.add('motor');
    this.motor.loop = true;
    this.gameSound = this.sound.add('game');
    this.gameSound.loop = true;
    this.gameSound.play();

    this.scene.scene.events.on('wake', () => {
      this.gameSound.play();
    });

    this.esc = this.input.keyboard.addKey('ESC');
    this.esc.on('down', function (event) {
      this.scene.wake('Start');
      this.scene.sleep('Game');
      this.motor.stop();
      this.gameSound.stop();
      window.isPause = true;
    }, this);
    this.keyUp = this.input.keyboard.addKey('up');
    this.localVolume = +localStorage.getItem('volume');
    this.keyUp.on('down', function (event) {
      this.motor.play({
        volume: this.localVolume * 0.001,
      });
    }, this);
    this.keyUp.on('up', function (event) {
      this.motor.stop();
    }, this);

    // this.soundPlay();
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
    this.stats = new Stats(this, this.laps);
    this.statsPanel = new StatsPanel(this, this.stats);
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
  }

  soundPlay() {
    this.sound.play('game', {
      volume: this.localVolume * 0.005,
      loop: true,
    });
  }

  onLapComplete(lap) {
    this.stats.onLapComplete();
    if (this.stats.complete) {
      // this.StatsPopup = new StatsPopup(this, this.stats);
      this.motor.stop();
      this.email = localStorage.getItem(LOCAL_STORAGE_KEY.email);
      const options = {
        method: 'POST',
        body: JSON.stringify({
          email: this.email,
          game: this.getStat(),
        }),
      };
      console.log(options);
      sendRequest(routes.submitGame, options);
      this.gameSound.stop();
      this.scene.start('Finish', { stats: this.stats });
    }
  }

  // вызывается много раз в секунду обновляя состояние сцены
  update(time, dt) {
    this.stats.update(dt);
    this.statsPanel.render();
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

  getStat() {
    const statistics = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.statistics));
    statistics.laps = `${this.stats.laps}`;
    statistics.bestLapTime = this.stats.timeBestLap.toFixed(2);
    statistics.averageLap = this.stats.averageLapTime.toFixed(2);
    statistics.time = this.stats.time.toFixed(2);
    statistics.date = `${getDate()}`;
    localStorage.setItem(LOCAL_STORAGE_KEY.statistics, JSON.stringify(statistics));
    return statistics;
  }
}
