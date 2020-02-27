export default class MyTileSprite extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y, width, height, texture, frame) {
        super(scene, x, y, width, height, texture, frame);
        scene.add.existing(this);
    }
}
