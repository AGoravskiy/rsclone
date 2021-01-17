import Phaser from 'phaser';
import Client from '../classes/Client';

const carProperty = {
  car_black_1: { MAXSPEED: 12, ACCELERATION: 0.6, SLIDE_ANGLE: 12 },
  car_blue_1: { MAXSPEED: 12, ACCELERATION: 1, SLIDE_ANGLE: 14 },
  car_red_1: { MAXSPEED: 15, ACCELERATION: 0.4, SLIDE_ANGLE: 15 },
  car_green_1: { MAXSPEED: 14, ACCELERATION: 0.7, SLIDE_ANGLE: 10 },
  car_yellow_1: { MAXSPEED: 10, ACCELERATION: 0.5, SLIDE_ANGLE: 10 },
};

export default class SelectCarScen extends Phaser.Scene {
  constructor() {
    super('SelectCar');
    this.carProperty = carProperty;
  }

  create() {
    this.createBackground();
    this.createmenu();
    // this.createButtons()
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  createmenu() {
    const wraper = document.createElement('div');
    wraper.style = 'display:flex; justify-content:center; align-items:center; position: absolute; top:0; width:100%; height:100%';
    document.body.append(wraper);
    document.body.style = 'position: relative';
    const maindiv = document.createElement('div');

    maindiv.style = `
            display:flex;
            flex-direction:column;
            justify-content:center;
            gap:20px; 
            width: 50%; 
            height: 70%; 
            `;
    function addCar(parent, path) {
      const div = document.createElement('div');
      const carmodel = path.substr(0, path.length - 4);
      console.log(carProperty[carmodel].MAXSPEED);
    //   div.textContent = `${carProperty[carmodel].MAXSPEED}`;
      div.dataset.car = carmodel;
      div.style = `
                cursor:pointer; width: 100px; 
                height: 100px; 
                font: 48px Arial; 
                font-weight: bold;
                background-image:url("./src/assets/cars/${path}");
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
            `;
      parent.append(div);
    }
    addCar(maindiv, 'car_black_1.png');
    addCar(maindiv, 'car_blue_1.png');
    addCar(maindiv, 'car_green_1.png');
    addCar(maindiv, 'car_red_1.png');
    addCar(maindiv, 'car_yellow_1.png');
    wraper.append(maindiv);
    maindiv.addEventListener('click', (event) => {
      this.startGame(event.target.getAttribute('data-car'), this.carProperty[event.target.getAttribute('data-car')]);
      maindiv.style.display = 'none';
    });
  }

  startGame(car, carProperty) {
    this.scene.start('Game', { client: this.client, car, carProperty });
  }

  createButtons() {
    // this.button1 = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, 'ONE PLAYER',
    // {font: 'bold 46px Arial', fill: '#FAFAD2'})
    // .setOrigin(0.5)
    // .setInteractive();

    // this.button2 = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'TWO PLAYER',
    // {font: 'bold 46px Arial', fill: '#FAFAD2'})
    // .setOrigin(0.5)
    // .setInteractive();

    this.button3 = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'Choose Car',
      { font: 'bold 46px Arial', fill: '#FAFAD2' })
      .setOrigin(0.5)
      .setInteractive();
  }

  setEvents() {
    this.button1.on('pointerdown', this.startGame, this);
    this.button2.on('pointerdown', this.requestGame, this);
    this.button3.on('pointerdown', this.chooseCar, this);
  }
}
