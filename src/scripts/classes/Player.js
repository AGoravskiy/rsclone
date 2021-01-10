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

const MAXSPEED = 10;
const ACCELERATION = 0.5;
const SLIDE_ANGLE = 5;

export default class Player {
  constructor(scene, map, config) {
    this.scene = scene;
    this.map = map;
    const position = this.map.getPlayerPosition(config.position);
    this.car = this.scene.matter.add.sprite(position.x, position.y, 'objects', config.sprite);
    this.car.setFixedRotation(false);
    this._velocity = 0;
    this.checkpoint = 0;
  }

  get direction() {
    let direction = DIRECTIONS.NONE;

    if (this.scene.cursors.up.isDown) {
      direction = DIRECTIONS.FORWARD;
    } else if (this.scene.cursors.down.isDown) {
      direction = DIRECTIONS.BACKWARD;
    }

    return direction;
  }

  get velocity() {
    const speed = Math.abs(this._velocity);
    const max = this.getMaxSpeed();
    if (this.direction && speed < max) {
      this._velocity += ACCELERATION * Math.sign(this.direction);
    } else if ((this.direction && speed > max)
         || (!this.direction && speed > 0)) {
      this._velocity -= ACCELERATION * Math.sign(this._velocity);
    }
    return this._velocity;
  }

  get turn() {
    let turn = TURNS.NONE;

    if (this.scene.cursors.left.isDown) {
      turn = TURNS.LEFT;
    } else if (this.scene.cursors.right.isDown) {
      turn = TURNS.RIGHT;
    }

    return turn;
  }

  get angle() {
    return ((this.car.angle + this.turn) * MAXSPEED) / 2;
  }

  getVelocityFromAngle() {
    const vec2 = new Phaser.Math.Vector2();
    return vec2.setToPolar(this.car.rotation - Math.PI / 2, this.velocity);
  }

  getMaxSpeed() {
    return MAXSPEED * this.map.getTileFriction(this.car);
  }

  slide() {
    this.car.angle += SLIDE_ANGLE;
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
