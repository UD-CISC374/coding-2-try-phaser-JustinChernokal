import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.exampleObject = new ExampleObject(this, 0, 0);
    //this.exampleObject = this.add.image(0,0,"background");
    //this.background.setOrigin(0,0);

    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});
  }

  update() {
  }
}
