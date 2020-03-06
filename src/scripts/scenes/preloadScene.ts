import Beam from "../objects/beam";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {


    /* IMAGES */

    this.load.image("background", "assets/images/country field.png");


    //ANIMATION SPRITES FROM EXAMPLE
    this.load.spritesheet("ship", "assets/spritesheets/ship.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "assets/spritesheets/ship2.png",{
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "assets/spritesheets/ship3.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });


      //ANIMATION SPRITE FOR MYGAME
    this.load.bitmapFont("myfont", "assets/font/font.png", "assets/font/font.xml" )

    this.load.spritesheet("mons", "assets/images/dragon maniac.png",{
      frameWidth: 24,
      frameHeight: 32,
    });

    this.load.spritesheet("mons2", "assets/images/the water nymph.png", {
      frameWidth: 30,
      frameHeight: 32
    });
    this.load.spritesheet("mons3", "assets/images/ramidile.png", {
      frameWidth: 74,
      frameHeight: 74
    });

    this.load.spritesheet("playerLeft", "assets/images/sheep_0.png", {
      frameWidth: 31,
      frameHeight: 23
    });

    this.load.spritesheet("playerRight", "assets/images/sheep_0.png", {
      frameWidth: 31,
      frameHeight: 23
    });

    this.load.spritesheet("SheepStill","assets/images/tiles_3.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("beam", "assets/images/boomerang.png", {
      frameWidth: 31,
      frameHeight: 30
    });

    /* AUDIO */

    this.load.audio("audio_beam", ["assets/audio/beam.ogg", "assets/audio/beam.mp3"]);
    this.load.audio("audio_explosion", ["assets/audio/explosion.ogg", "assets/audio/explosion.mp3"]);
    this.load.audio("audio_pickup", ["assets/audio/pickup.ogg", "assets/audio/pickup.mp3"]);
    this.load.audio("music", ["assets/audio/sci-fi_platformer12.ogg", "assets/audio/sci-fi_platformer12.mp3"]);

    this.load.audio("baa", "assets/audio/sheep-baaing.mp3");

  }




  create() {

    /* ANIMATIONS */

    // ship animations
    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("mons", {start: 9, end:10}),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("mons2", { start: 6, end:7}),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("mons3", { start: 0, end: 1}),
      frameRate: 5,
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

    //Player animation
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers("playerLeft" , {start: 3, end: 0}),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers("playerRight", {start: 4, end: 7}),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'leftTurn',
      frames: this.anims.generateFrameNumbers("SheepStill", {start: 0, end:0}),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'rightTurn',
      frames: this.anims.generateFrameNumbers('SheepStill', {start: 0, end:0}),
      frameRate: 5,
      repeat: -1
    });


    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam", {start: 0}),
      frameRate: 20,
      repeat: -1
    });


    this.scene.start('MainScene');
  }
}
