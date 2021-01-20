const GRASS_FRICTION = 0.3;
const ROADS_FRICTION = {
  road: 1,
  ground: 0.5,
  sand: 0.4,
};

export default class Map {
  constructor(scene, mapa) {
    this.mapa = mapa;
    this.scene = scene;
    this.init();
    this.create();
  }

  init() {
    this.tilemap = this.scene.make.tilemap({ key: this.mapa });
    this.tileset = this.tilemap.addTilesetImage('tileset', 'tileset', 64, 64, 0, 0);
  }

  create() {
    this.createLayers();
    this.createCollisions();
    this.createOils();
    this.createCheckPoints();
    this.createArrow();
  }

  createLayers() {
    this.tilemap.createLayer('grass', this.tileset);
    this.tilemap.createLayer('ground', this.tileset);
    this.tilemap.createLayer('sand', this.tileset);
    this.tilemap.createLayer('road', this.tileset);
  }

  correctObjectPosition(obj){
    if(obj.rotation == 0){
      return this.scene.matter.add.sprite(obj.x + obj.width / 2, obj.y - obj.height / 2, 'objects', obj.name);
    }
    else if(obj.rotation > 0 && obj.rotation < 90){
      return this.scene.matter.add.sprite(obj.x + obj.width / 2, obj.y + obj.height / 2 , 'objects', obj.name);
    }
    else if(obj.rotation == 90){
      return this.scene.matter.add.sprite(obj.x + obj.height / 2, obj.y + obj.width / 2, 'objects', obj.name);
    }
    else if(obj.rotation > 90 && obj.rotation < 180){
      return this.scene.matter.add.sprite(obj.x - obj.width / 2, obj.y + obj.height / 2 + obj.width * Math.tan(obj.rotation), 'objects', obj.name);
    }
    else if(obj.rotation == 180){
      return this.scene.matter.add.sprite(obj.x - obj.width / 2, obj.y + obj.height / 2, 'objects', obj.name);
    }
    else if(obj.rotation > 180 && obj.rotation < 270){
      return this.scene.matter.add.sprite(obj.x - obj.width/2, obj.y - obj.height/4, 'objects', obj.name);
    }
    else if(obj.rotation == 270){
      return this.scene.matter.add.sprite(obj.x - obj.height/2, obj.y - obj.width/2, 'objects', obj.name);
    }
    else{
      return this.scene.matter.add.sprite(obj.x + obj.width / 2, obj.y - obj.height / 2, 'objects', obj.name);
    }
 }

  createCollisions() {
    this.tilemap.findObject('collisions', (collision) => {
      const sprite = this.correctObjectPosition(collision)
      // sprite.setOrigin(0, 1);
      sprite.angle = collision.rotation;
      sprite.setStatic(true);
    });
  }

  createOils() {
    this.tilemap.findObject('oils', (oil) => {
      const sprite = this.scene.matter.add.sprite(oil.x + oil.width / 2, oil.y - oil.height / 2, 'objects', oil.name);
      sprite.setStatic(true); // отключаем обработку физических воздействий
      sprite.setSensor(true); // можно ехать по лужам
    });
  }

  createArrow() {
    this.tilemap.findObject('arrows', (arrow) => {
      const sprite = this.scene.matter.add.sprite(arrow.x, arrow.y, 'objects', arrow.name);
      sprite.setOrigin(0, 1);
      sprite.angle = arrow.rotation;
      sprite.setStatic(true); // отключаем обработку физических воздействий
      sprite.setSensor(true);
    });
  }

  createCheckPoints() {
    this.checkpoints = [];
    this.tilemap.findObject('checkpoints', (checkpoint) => {
      const rectangle = new Phaser.Geom.Rectangle(
        checkpoint.x, checkpoint.y, checkpoint.width, checkpoint.height,
      );
      rectangle.index = checkpoint.properties.find((property) => property.name === 'value').value;
      this.checkpoints.push(rectangle);
    });
  }

  getPlayerPosition(positionName) {
    return this.tilemap.findObject(positionName, (position) => position.name === positionName);
  }

  // eslint-disable-next-line consistent-return
  getTileFriction(car) {
    // eslint-disable-next-line guard-for-in
    for (const road in ROADS_FRICTION) {
      const tile = this.tilemap.getTileAtWorldXY(
        car.x, car.y, false, this.scene.cameras.main, road,
      );
      if (tile) {
        return ROADS_FRICTION[road];
      }
      return GRASS_FRICTION;
    }
  }

  getCheckPoint(car) {
    const checkpoint = this.checkpoints.find((checkpoint) => checkpoint.contains(car.x, car.y));
    return checkpoint ? +checkpoint.index : false;
  }
}
