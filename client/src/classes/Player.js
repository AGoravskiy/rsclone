/* eslint-disable no-mixed-operators */
/* eslint-disable no-underscore-dangle */
const DIRECTIONS = Object.freeze({
  BACKWARD: -1,
  NONE: 0,
  FORWARD: 1,
});

const TURNS = Object.freeze({
  LEFT: -1,
  NONE: 0,
  RIGHT: 1,
});

export default class Player {
  constructor(scene, map, config, carProperty) {
    this.scene = scene;
    this.map = map;
    const position = this.map.getPlayerPosition(config.position);
    this.car = this.scene.matter.add.sprite(position.x, position.y, 'objects', config.sprite);
    this.car.angle = position.type;
    this.car.setFixedRotation(false);
    this._velocity = 0;
    this.checkpoint = 0;
    this.soundMotor = this.scene.sound.sounds.find((audio) => audio.key === 'motor');
    this.carProperty = carProperty;
  }

  get direction() {
    let direction = DIRECTIONS.NONE;

    if (this.scene.cursors.up.isDown || this.scene.w.isDown) {
      direction = DIRECTIONS.FORWARD;
    } else if (this.scene.cursors.down.isDown || this.scene.s.isDown) {
      direction = DIRECTIONS.BACKWARD;
    }
    return direction;
  }

  get nitro() {
    let nitro = 1;
    if (this.scene.cursors.shift.isDown) {
      nitro = this.carProperty.NITROGEN;
    } else {
      nitro = 1;
    }
    return nitro;
  }

  get slowdown() {
    let slowdown = 1;
    if (this.scene.cursors.space.isDown) {
      slowdown = this.carProperty.SLOWDOWN;
    } else {
      slowdown = 1;
    }
    // console.log(slowdown);
    return slowdown;
  }

  get velocity() {
    const speed = Math.abs(this._velocity);
    const max = this.getMaxSpeed();
    if (this.direction && speed < max) {
      this._velocity += this.carProperty.ACCELERATION
      / this.slowdown
      * this.nitro
      * Math.sign(this.direction);
    } else if (this.direction && speed > max) {
      this._velocity -= this.carProperty.ACCELERATION
      / this.slowdown
      * this.nitro
      * Math.sign(this.direction);
    } else if (!this.direction && speed > 0) {
      if (speed < 0.3) {
        this._velocity = 0;
      } else {
        this._velocity -= this.carProperty.ACCELERATION * 0.1
        * this.slowdown
        * Math.sign(this._velocity);
      }
    }
    return this._velocity;
  }

  get turn() {
    let turn = TURNS.NONE;
    if (this.scene.cursors.left.isDown || this.scene.a.isDown) {
      turn = TURNS.LEFT;
    } else if (this.scene.cursors.right.isDown || this.scene.d.isDown) {
      turn = TURNS.RIGHT;
    }
    return turn;
  }

  get angle() {
    return this.car.angle + this.turn * this.nitro * this.carProperty.SLIDE_ANGLE;
  }

  getVelocityFromAngle() {
    const vec2 = new Phaser.Math.Vector2();
    return vec2.setToPolar(this.car.rotation - Math.PI / 2, this.velocity);
  }

  getMaxSpeed() {
    return this.carProperty.MAXSPEED * this.nitro * this.map.getTileFriction(this.car);
  }

  slide() {
    this.car.angle += this.carProperty.SLIDE_ANGLE * this.nitro;
  }

  move() {
    this.car.setAngle(this.angle);
    const velocity = this.getVelocityFromAngle();
    this.car.setVelocity(velocity.x, velocity.y);
    this.checkPosition();
  }

  checkPosition() {
    const checkpoint = this.map.getCheckPoint(this.car);
    if (checkpoint) {
      this.onCheckPoint(checkpoint);
    }
  }

  onCheckPoint(checkpoint) {
    if (checkpoint === 1 && this.checkpoint === this.map.checkpoints.length) {
      this.checkpoint = 1;
      this.car.emit('lap');
    } else if (checkpoint === this.checkpoint + 1) {
      ++this.checkpoint;
    }
  }
}
