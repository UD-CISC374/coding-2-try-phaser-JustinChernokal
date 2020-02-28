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
  powerUps: Phaser.Physics.Arcade.Group;
  enemies: Phaser.Physics.Arcade.Group;
  score: integer;
  scorelabel: Phaser.GameObjects.BitmapText;
  //private explosion: ExampleObject;
  private background: TileSprite;
  

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    

    this.exampleObject = new ExampleObject(this, 0, 0);
    this.background = this.add.tileSprite(0, 0, this.scale.width*2.1, this.scale.height*2 + 600  ,"background");
    

    this.ship1 = this.physics.add.sprite(this.scale.width/2 - 50, this.scale.height, "ship");
    this.ship2 = this.physics.add.sprite(this.scale.width/2, this.scale.height, "ship2");
    this.ship3 = this.physics.add.sprite(this.scale.width/2 + 50, this.scale.height, "ship3");
    
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

    //TEXT-scorelabel
    //this.scorelabel = this.add.bitmapText(10, 5, "myfont", "score ", 16);
    this.add.text(125, 5, "Avoid Falling Monsters!", {font: "15px Arial", fill: "red"});
  
    
    //Powerups
    this.physics.world.setBoundsCollision();

    this.powerUps = this.physics.add.group();

    var maxObjects = -1;
    for (var i =0; i <= maxObjects; i++) {
      var powerUp = this.physics.add.sprite(16,16,"power-up");
      this.powerUps.add(powerUp);
        powerUp.setRandomPosition(0, 0, this.game.scale.width, this.game.scale.height);
    
      powerUp.setVelocity(100,100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }
  

  
    //Player
    this.player = this.physics.add.sprite(this.scale.width/2 - 8, this.scale.height - 64, "player");
    //this.player.play("thrust");
    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
    this.player.setCollideWorldBounds(true);

  //Collision

  this.physics.add.collider(this.player, this.ship1, 
    function(player, ship1){
      player.destroy();
  });
  this.physics.add.collider(this.player, this.ship2, 
    function(player, ship2){
      player.destroy();
  });
  this.physics.add.collider(this.player, this.ship3, 
    function(player, ship3){
      player.destroy();
  });
  this.physics.add.collider(this.ship3, this.powerUps);
  this.physics.add.collider(this.ship1, this.powerUps);
  this.physics.add.collider(this.ship2, this.powerUps);
  //this.physics.add.collider(this.powerUps, this.player);


  this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp);

  
  }

  pickPowerUp (player, powerUp){ 
    //this.resetPowerups(powerUp);
    powerUp.disableBody(true, true);
    this.score += 15;
    
    }

  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > this.scale.height) {
      this.resetShipPos(ship);
      ship.setVelocityY(0);
    }
  }

  resetShipPos(ship){
    ship.y = 0;
    var randomX = Phaser.Math.Between(0, this.scale.width);
    ship.x = randomX;
  }

  resetPowerups(powerUp){
    powerUp.y = 0;
    var randomX = Phaser.Math.Between(0, this.scale.width);
    powerUp.x = randomX;
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    this.background.tilePositionX -= 0.5;

    this.movePlayerManager();

  }

  movePlayerManager(){

    if(this.left.isDown){
      this.player.setVelocityX(-200);
    }else if(this.right.isDown){
      this.player.setVelocityX(200);
    }else if(this.left.isUp){
      this.player.setVelocityX(0);
    }else if(this.right.isUp){
      this.player.setVelocityX(0);
    }
  }
}
