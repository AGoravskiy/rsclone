async function postStat(url, data) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default class StatsPopup {
  constructor(scene, stats) {
    this.scene = scene;
    this.stats = stats;
    this.create();
  }

  create() {
    const style = {
      font: '30px Arial',
      fill: 'white',
    };

    const popupWidth = 800;
    const popupHeight = 600;

    this.popup = this.scene.add.graphics()
      .setScrollFactor(0)
      .fillStyle(0x000000, 0.5)
      .fillRect((
        this.scene.sys.game.config.width - popupWidth) / 2,
      (this.scene.sys.game.config.height - popupHeight) / 2,
      popupWidth,
      popupHeight);

    this.title = this.scene.add.text(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY - 200,
      'Level Complete', {
        font: '46px Arial',
        fill: '#FAFAD2',
      },
    )
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.time = this.scene.add.text(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY - 50,
      `Total time: ${this.stats.time.toFixed(2)}`, style,
    )
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.title = this.scene.add.text(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY + 50,
      `Best lap: ${this.stats.timeBestLap.toFixed(2)}`, style,
    )
      .setOrigin(0.5)
      .setScrollFactor(0);
    this.averageTime = this.scene.add.text(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY + 100,
      `Averege time of lap: ${this.stats.averageLapTime.toFixed(2)}`, style,
    )
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.text = this.scene.add.text(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY + 200,
      'Tap to continue!', style,
    )
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.scene.input.once('pointerdown', () => {
      this.scene.scene.start('Start');
    });
  }
}

/*
postStatistics() {
    this.statistics = {
      map: localStorage.getItem('map'),
      car: localStorage.getItem('car'),
      laps: localStorage.getItem('laps'),
      time: this.stats.time.toFixed(2),
      bestLapTime: this.stats.timeBestLap,
      date: new Date(),
    };
    console.log(this.statistics);
    this.host = 'https://nfs-jsu.herokuapp.com/submit-game';
    postStat(this.host, this.statistics).then((data) => console.log(data));
  }
  */
