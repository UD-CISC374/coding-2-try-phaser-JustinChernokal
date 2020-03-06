import ExampleObject from '../objects/exampleObject';
import TileSprite from '../objects/myTileSprite';
import Beam from '../objects/beam';
import { Input, LEFT, Cameras } from 'phaser';


export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  ship1: Phaser.Physics.Arcade.Sprite;
  ship2: Phaser.Physics.Arcade.Sprite;
  ship3: Phaser.Physics.Arcade.Sprite;
  player: Phaser.Physics.Arcade.Sprite;
  beam: Phaser.Physics.Arcade.Sprite;
  left: Input.Keyboard.Key;
  right: Input.Keyboard.Key;
  space: Input.Keyboard.Key;
  gamesSettings = {
    playerSpeed: 200,
  };
  powerUps: Phaser.Physics.Arcade.Group;
  enemies: Phaser.Physics.Arcade.Group;
  projectiles: Phaser.Physics.Arcade.Group;
  score: number = 0; 
  scorelabel; 
  private background: TileSprite;
  

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    

    this.background = this.add.tileSprite(0, 0, this.scale.width*2, this.scale.height*2 + 450,"background");
    

    //ENEMIES
    this.ship1 = this.physics.add.sprite(this.scale.width/2 - 50, this.scale.height,"mons");
    this.ship2 = this.physics.add.sprite(this.scale.width/2, this.scale.height, "mons2");
    this.ship3 = this.physics.add.sprite(this.scale.width/2 + 50, this.scale.height, "mons3");
    //this.explosion = this.add.sprite(0, 0, "explosion");
    this.ship1.setScale(1.5);
    this.ship2.setScale(1.5);
    this.ship3.setScale(0.75);

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");
    

    //TEXT-scorelabel
    this.score = 0;
    console.log(this.score);
    this.scorelabel = this.add.bitmapText(10, 5, "myfont", "SCORE: " + this.score.toString(), 16);
    this.add.text(125, 5, "Avoid Falling Monsters!", {font: "15px Arial", fill: "red"});
  
    
    //Powerups
    

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
    this.player = this.physics.add.sprite(this.scale.width/2 - 8, this.scale.height - 64, "SheepStill")

    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.player.setCollideWorldBounds(true);
    this.player.enableBody(true, this.player.x, this.player.y, true, true);

    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.projectiles = this.physics.add.group();
    //this.projectiles.add(Beam)

    



  //Collision

  this.physics.world.setBoundsCollision();

  this.physics.add.collider(this.player, this.ship1, 
    function(player, ship1){
      player.setActive(false);
      player.destroy();
  });
  this.physics.add.collider(this.player, this.ship2, 
    function(player, ship2){
      player.setActive(false);
      player.destroy();
  });
  this.physics.add.collider(this.player, this.ship3, 
    function(player, ship3){
      player.setActive(false);
      player.destroy();
  }, undefined, this);

  /*
  this.physics.add.collider(this.ship3, this.projectiles);
  this.physics.add.collider(this.ship1, this.projectiles);
  this.physics.add.collider(this.ship2, this.projectiles);
  */
  this.physics.add.collider(this.projectiles, this.enemies, this.hitEnemies, 
    function( projectile, enemy){
      projectile.destroy();
    }, this);

  //this.physics.add.collider(this.powerUps, this.player);


  this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp);

  }


  // Movement & Collison Functions

  shootBeam(){
    let beam = new Beam(this);
  }

  pickPowerUp (player, powerUp){ 
    //this.resetPowerups(powerUp);
    powerUp.disableBody(true, true);
    }

  hitEnemies(projectile, enemy) {
    this.resetShipPos(enemy);
    projectile.destroy();
    this.score += 15;
    this.scorelabel.text = "score " + this.score.toString();
    console.log(this.score);

  }


  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > this.scale.height) {
      this.resetShipPos(ship);
      ship.setVelocityY(0);
    }
  }

  //RESET functions
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


  //UPDATE
  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    this.background.tilePositionX -= 0.5;

    if(this.player.active){

      this.movePlayerManager();

      if (Phaser.Input.Keyboard.JustDown(this.space)){
        this.shootBeam();
      }

    }
    for(var i =0; i < this.projectiles.getChildren().length; i++){
      let beam = this.projectiles.getChildren()[i];
      beam.update();
    }

  }

  movePlayerManager(){


    if(this.left.isDown){
      this.player.setVelocityX(-200);
      this.player.anims.play('left', true);
    }else if(this.right.isDown){
      this.player.setVelocityX(200);
      this.player.anims.play('right', true);
    }else if(this.left.isUp){
      this.player.setVelocityX(0);
      this.player.anims.play('leftTurn', true);
    }else if(this.right.isUp){
      this.player.setVelocityX(0);
      this.player.anims.play('leftTurn', true);
    }
  }
}
