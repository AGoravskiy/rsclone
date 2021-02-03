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

const LAPS = 5;
const CARS = {
  BLUE: {
    sprite: 'car_black_1',
    position: 'player',
    carProperty: {
      MAXSPEED: 9,
      ACCELERATION: 0.5,
      SLIDE_ANGLE: 3.6,
      NITROGEN: 1.5,
      english: 'Black death',
      russian: 'Чёрная смерть',
      belarusian: 'Чорная смерць',
    },

  },
  RED: {
    sprite: 'car_yellow_1',
    position: 'enemy',
    carProperty: {
      MAXSPEED: 9,
      ACCELERATION: 0.5,
      SLIDE_ANGLE: 3.6,
      NITROGEN: 1.5,
      english: 'Yellow punch',
      russian: 'Жёлтый удар',
      belarusian: 'Жоўты ўдар',
    },
  },
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init(data) {
    if (data.laps) {
      this.laps = data.laps;
    } else {
      this.laps = LAPS;
    }

    if (data.map) {
      this.mapa = data.map;
    } else {
      this.mapa = 'adelaidemap';
    }

    if (data.client) {
      this.client = data.client;
    }
    if (data.carProperty) {
      this.carProperty = data.carProperty;
    } else {
      this.carProperty = CARS.BLUE.carProperty;
    }

    if (data.car) {
      this.carmodel = data.car;
    } else {
      this.carmodel = CARS.BLUE.sprite;
    }
    this.cursors = this.input.keyboard.createCursorKeys();
    this.w = this.input.keyboard.addKey('W');
    this.s = this.input.keyboard.addKey('S');
    this.a = this.input.keyboard.addKey('A');
    this.d = this.input.keyboard.addKey('D');
    this.link = 'https://nfs-jsu.herokuapp.com/submit-game';
  }

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
    if (localStorage.getItem('volume')) {
      this.localVolume = +localStorage.getItem('volume');
    } else {
      this.localVolume = 0;
    }

    this.createSounds(this.localVolume);
    this.input.on('gameobjectdown', function () {
      this.scene.launch('start');
    });
    this.motor = this.sound.add('motor', { loop: true });

    // this.scene.scene.events.on('wake', () => {
    //   this.gameSound.play();
    // });

    this.esc = this.input.keyboard.addKey('ESC');
    this.esc.on('down', function (event) {
      console.log("press esc in Game");
      this.scene.launch('Start');
      this.scene.sleep('Game');
      this.motor.stop();
      // this.gameSound.stop();
      window.isPause = true;
    }, this);
    this.keyUp = this.input.keyboard.addKey('up');
    this.keyUp.on('down', function (event) {
      this.motor.play({
        volume: this.localVolume * 0.0005,
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

  createSounds(volume) {
    this.randomNumForTrack = Phaser.Math.Between(1, 10);
    this.selectedTrack = `track${this.randomNumForTrack}`;
    this.sounds = {
      track1: this.sound.add('track1'),
      track2: this.sound.add('track2'),
      track3: this.sound.add('track3'),
      track4: this.sound.add('track4'),
      track5: this.sound.add('track5'),
      track6: this.sound.add('track6'),
      track7: this.sound.add('track7'),
      track8: this.sound.add('track8'),
      track9: this.sound.add('track9'),
      track10: this.sound.add('track10'),
    };

    this.sounds[this.selectedTrack].play({
      volume: volume * 0.01,
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
      this.sounds[this.selectedTrack].stop();
      this.scene.start('Finish', { stats: this.stats });
    }
  }

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
