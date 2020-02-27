import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.exampleObject = new ExampleObject(this, 0, 0);
    this.add.image(this.scale.width/2, this.scale.height/2,"background");
    //image.setOrigin(0,0);

    this.add.image(this.scale.width/2 - 50, this.scale.height/2, "ship");
    this.add.image(this.scale.width/2, this.scale.height/2, "ship2");
    this.add.image(this.scale.width/2 + 50, this.scale.height/2, "ship3");

    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});
  }

  moveShip(ship, speed) {
    ship.y += speed;
  }

  update() {
  }
}
