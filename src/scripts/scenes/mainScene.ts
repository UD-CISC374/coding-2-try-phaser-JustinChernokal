import ExampleObject from '../objects/exampleObject';
import TileSprite from '../objects/myTileSprite';
import { Input, LEFT } from 'phaser';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  ship1: Phaser.GameObjects.Sprite;
  ship2: Phaser.GameObjects.Sprite;
  ship3: Phaser.GameObjects.Sprite;
  player: Phaser.Physics.Arcade.Sprite;
  left: Input.Keyboard.Key;
  right: Input.Keyboard.Key;
  gamesSettings = {
    playerSpeed: 200,
  };
  //powerUps: Phaser.GameObjects.Sprite;
  //private explosion: ExampleObject;
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
    //this.explosion = this.add.sprite(0, 0, "explosion");


    //animations
    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship", {start: 0}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2", { start: 0}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3", { start: 0}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", { start: 0, end: 4}),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player", {}),
      frameRate: 20,
      repeat: -1
    })

  
    //this.ship1.play("ship1_anim");
    //this.ship2.play("ship2_anim");
    //this.ship3.play("ship3_anim");


    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});
  
    
    //Powerups
    this.physics.world.setBoundsCollision();

    //this.powerUps = this.physics.add.group();

    var maxObjects = 4;
    for (var i =0; i <= maxObjects; i++) {
      var powerUp = this.physics.add.sprite(16,16,"power-up");
     //this.powerUps.add(powerUp);
        powerUp.setRandomPosition(0, 0, this.game.scale.width, this.game.scale.height);
    
      powerUp.setVelocity(100,100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }
  

  
    //Player
    //this.player = this.physics.add.sprite(this.scale.width/2 - 8, this.scale.height - 64, "player");
    this.player = this.physics.add.sprite(8,8,"player");
    //this.player.play("thrust");
    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
    this.player.setCollideWorldBounds(true);

  
  
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

    this.movePlayerManager();
  }

  movePlayerManager(){

    if(this.left.isDown){
      this.player.setVelocityX(-200);
    }else if(this.right.isDown){
      this.player.setVelocityX(200);
    }
  }
}
