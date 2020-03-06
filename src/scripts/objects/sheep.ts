export default class Sheep extends Phaser.GameObjects.Sprite{
    body: Phaser.Physics.Arcade.Body;
    
    constructor(scene: Phaser.Scene){
        
        super(scene, scene.scale.width/2, 0, "sheep")
    }

}