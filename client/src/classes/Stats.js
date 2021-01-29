export default class Stats {
  constructor(scene, laps) {
    this.scene = scene;
    this.laps = laps;
    this.lap = 1;
    this.lapsTimeContainer = [];
    this.time = 0;
    this.timeLap = 0;
    this.timeBestLap = 0;
    this.averageLapTime = 0;
    this.timeLastLap = 0;
  }

  get complete() {
    return this.lap > this.laps;
  }

  onLapComplete() {
    ++this.lap;

    if (this.timeBestLap === 0 || this.timeLap < this.timeBestLap) {
      this.timeBestLap = this.timeLap;
    }
    this.lapsTimeContainer.push(this.timeLap);
    this.timeLastLap = this.timeLap;
    this.timeLap = 0;
    this.averageLapTime = (this.lapsTimeContainer.reduce((accum, item) => accum + item))
     / this.lapsTimeContainer.length;
  }

  update(dt) {
    if (!this.complete) {
      const time = dt / 1000;
      this.time += time;
      this.timeLap += time;
    }
  }
}
