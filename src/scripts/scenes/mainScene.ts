import ExampleObject from '../objects/exampleObject';
import TileSprite from '../objects/myTileSprite';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private ship1: ExampleObject;
  private ship2: ExampleObject;
  private ship3: ExampleObject;
  private background: TileSprite;
  

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    

    this.exampleObject = new ExampleObject(this, 0, 0);
    this.background = this.add.tileSprite(0, 0, this.scale.width*2, this.scale.height*2,"background");
    

    this.ship1 = this.add.sprite(this.scale.width/2 - 50, this.scale.height/2, "ship");
    this.ship2 = this.add.sprite(this.scale.width/2, this.scale.height/2, "ship2");
    this.ship3 = this.add.sprite(this.scale.width/2 + 50, this.scale.height/2, "ship3");

    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});
  }

  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > this.scale.height) {
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship){
    ship.y = 0;
    var randomX = Phaser.Math.Between(0, this.scale.width);
    ship.x = randomX;
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    this.background.tilePositionY -= 0.5;
  }
}
