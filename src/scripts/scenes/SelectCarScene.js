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
  init(data){
    this.map = data.map;
  }

  create() {
    this.createBackground();
    this.createmenu();
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
      const carmodel = path.substr(0, path.length - 4);
      const carInfo = document.createElement('div');
      carInfo.dataset.car = carmodel;
      carInfo.style = `
                display:flex;
                justify-content:center;
                align-items: center;
                gap:20px;
                width: 100%; 
                height: 100px; 
                cursor:pointer; 
                border-bottom: 1px solid;
            `;

      const carImage = document.createElement('div');
      carImage.style = `
                width: 100px; 
                height: 100px; 
                background-image:url("./src/assets/cars/${path}");
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                margin-left: auto;
            `;

      const carProp = document.createElement('div');
      carProp.style = `
            cursor:pointer; 
            width: 100%; 
            font: 24px Arial; 
            margin-right: auto;
            `;

      const speed = document.createElement('p');
      speed.textContent = ` Max speed : ${carProperty[carmodel].MAXSPEED}`;
      carProp.append(speed);

      const acceleration = document.createElement('p');
      acceleration.textContent = `Acceleration : ${carProperty[carmodel].ACCELERATION}`;
      carProp.append(acceleration);

      const slide = document.createElement('p');
      slide.textContent = `Slide angle : ${carProperty[carmodel].SLIDE_ANGLE}`;
      carProp.append(slide);

      carInfo.append(carImage);
      carInfo.append(carProp);
      parent.append(carInfo);
    }

    addCar(maindiv, 'car_black_1.png');
    addCar(maindiv, 'car_blue_1.png');
    addCar(maindiv, 'car_green_1.png');
    addCar(maindiv, 'car_red_1.png');
    addCar(maindiv, 'car_yellow_1.png');
    wraper.append(maindiv);
    for (const item of maindiv.childNodes) {
      item.addEventListener('click', (event) => {
        this.startGame(item.getAttribute('data-car'), this.carProperty[item.getAttribute('data-car')], this.map);
        maindiv.style.display = 'none';
      });
    }
  }

  startGame(car, carProperty, map) {
    this.scene.start('Game', { client: this.client, car, carProperty, map });
  }
}
