export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/images/country field.png");
    /* ANIMATION SPRITES FROM EXAMPLE
    this.load.spritesheet("ship", "assets/spritesheet/ship.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "assets/spritesheet/ship2.png",{
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "assets/spritesheet/ship3.png"),{
      frameWidth: 32,
      frameHeight: 32
    };
    this.load.spritesheet("explosion", "assets/spritesheet/explosion.png"),{
      frameWidth: 16,
      frameHeight: 16
    };
*/
    this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });


    this.load.bitmapFont("myfont", "assets/font/font.png", "assets/font/font.fnt" )

    this.load.spritesheet("mons", "assets/images/dragon maniac.png",{
      frameWidth: 22,
      frameHeight: 28
    });

    this.load.spritesheet("mons2", "assets/images/the water nymph.png", {
      frameWidth: 22,
      frameHeight: 28
    });
    this.load.spritesheet("mons3", "assets/images/ramidile.png", {
      frameWidth: 66,
      frameHeight: 74
    });

    this.load.spritesheet("player", "assets/images/sheep_0.png", {
      frameWidth: 28,
      frameHeight: 22
    });

  }

  create() {
    this.scene.start('MainScene');
  }
}
