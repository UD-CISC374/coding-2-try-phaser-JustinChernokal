import ExampleObject from '../objects/exampleObject';
import TileSprite from '../objects/myTileSprite';
import Beam from '../objects/beam';
import { Input, LEFT, Cameras } from 'phaser';
import Explosion from '../objects/explosion';


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
  powerUps: Phaser.Physics.Arcade.Group;
  enemies: Phaser.Physics.Arcade.Group;
  projectiles: Phaser.Physics.Arcade.Group;
  score: number = 0; 
  scorelabel; 
  beamSound;
  explosionSound;
  pickupSound;
  music;
  sheepBaa;
  private background: TileSprite;
  

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    
    /* BACKGROUND IMAGES & SPRITES */
    this.background = this.add.tileSprite(0, 0, this.scale.width*2, this.scale.height*2 + 450,"background");
    

    /* Enemies */
    //Emeny Implementation 
    this.ship1 = this.physics.add.sprite(this.scale.width/2 - 50, this.scale.height,"mons");
    this.ship2 = this.physics.add.sprite(this.scale.width/2, this.scale.height, "mons2");
    this.ship3 = this.physics.add.sprite(this.scale.width/2 + 50, this.scale.height, "mons3");

    //Enemy Scale
    this.ship1.setScale(1.5);
    this.ship2.setScale(1.5);
    this.ship3.setScale(0.75);

    //Enemy Grouping
    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

    //Enemy Anims
    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");
    
    /* TEXT GRAPHICS & REPRESENTATION */

    //Black box top of screen
    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(this.scale.width, 0);
    graphics.lineTo(this.scale.width, 20);
    graphics.lineTo(0, 20);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();

    


    //Score and score label
    this.score = 0;
    var scoreFormated = this.zeroPad(this.score, 4)
    this.scorelabel = this.add.bitmapText(10, 5, "myfont", "SCORE: " + scoreFormated, 16);

    //Text labels
    this.add.text(120, 2, "Avoid Falling Monsters!", {font: "15px Arial", fill: "red"});
    this.add.text(290, 5, "Press SPACE to shoot", {font: "10px Arial", fill: "white"})
  

    /* AUDIO */

    //sound implementation
    this.beamSound = this.sound.add("audio_beam");
    this.explosionSound = this.sound.add("audio_explosion");
    this.pickupSound = this.sound.add("audio_pickup");
    this.sheepBaa = this.sound.add("baa");


    this.music = this.sound.add("music");

    var musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    }

    this.music.play(musicConfig);

    /* UNUSED */
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
  

  
    /* PLAYER */

    //player implementation
    this.player = this.physics.add.sprite(this.scale.width/2 - 8, this.scale.height - 64, "SheepStill")

    //player physics & controller
    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.player.setCollideWorldBounds(true);
    this.player.enableBody(true, this.player.x, this.player.y, true, true);

    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.projectiles = this.physics.add.group();

    



  /* COLLISION */

  //World collision implementation
  this.physics.world.setBoundsCollision();

  //Enemies hurt player collision
  this.physics.add.collider(this.player, this.enemies, this.hurtPlayer,
    undefined, this);
 
  //Projectiles hit enemies collison
  this.physics.add.collider(this.projectiles, this.enemies, this.hitEnemies, 
    function( projectile, enemy){
      projectile.destroy();
    }, this);

  //Unused powerup collision with player
  this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp);

  }

  
  /* FUNCTIONS */


  // Movement & Collison Functions //

  shootBeam(){
    let beam = new Beam(this);
    this.sheepBaa.play();
  }

  //unused powerup function
  pickPowerUp (player, powerUp){ 
    //this.resetPowerups(powerUp);
    powerUp.disableBody(true, true);
    }


  hitEnemies(projectile, enemy) {

    var explosion = new Explosion(this, enemy.x, enemy.y);
    this.explosionSound.play();

    this.resetShipPos(enemy);
    projectile.destroy();

    this.score += 15;
    var scoreFormated = this.zeroPad(this.score, 4)
    this.scorelabel.text = "SCORE: " + scoreFormated;

  }

  hurtPlayer(player, enemy){
    if( player.alpha == 1){
      player.setActive(false);
      player.disableBody(true, true);
    }

    if(this.player.alpha < 1){
      return;
    } 


    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false
    });
  }


  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > this.scale.height) {
      this.resetShipPos(ship);
      ship.setVelocityY(0);
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

  /* TEXT FUNCTIONS */

  //zero pad
  zeroPad(number, size){
    var stringNumber = String(number);
    while(stringNumber.length < (size || 2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }


  /* RESET FUNCTIONS */

  resetShipPos(ship){
    ship.y = 0;
    var randomX = Phaser.Math.Between(0, this.scale.width);
    ship.x = randomX;
  }

  resetPlayer(){
    this.player.enableBody(true, this.scale.width/2 - 8, this.scale.height + 64, true, true);
    this.player.alpha = 0.5;


    /*this.score -= 50;
    var scoreFormated = this.zeroPad(this.score, 3)
    this.scorelabel.text = "SCORE: " + scoreFormated;*/


    var tween = this.tweens.add({
      targets: this.player,
      y: this.scale.height - 28,
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete: () => {
        this.player.alpha = 1;
      },
      callbackScope: this
    });
  }


  //unused powerup reset
  resetPowerups(powerUp){
    powerUp.y = 0;
    var randomX = Phaser.Math.Between(0, this.scale.width);
    powerUp.x = randomX;
  }


  /* UPDATE FUNCTION */

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


}
