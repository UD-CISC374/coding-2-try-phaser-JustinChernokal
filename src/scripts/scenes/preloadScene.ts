export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/images/background.png");
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

    this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet("player", "assets/spritesheet/ship.png",{
      frameWidth: 8,
      frameHeight: 8
    });

  }

  create() {
    this.scene.start('MainScene');
  }
}
