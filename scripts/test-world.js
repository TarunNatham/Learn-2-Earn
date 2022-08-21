const fullWidth = window.innerWidth;
const fullHeight = window.innerHeight;

var config = {
  type: Phaser.AUTO,
  width: fullWidth,
  height: fullHeight,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false,
        fps: 60
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
    render: render
 }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image('sky', 'images/sky.png');
  this.load.image('ground', 'images/platform.png');
  this.load.image('diamond', 'images/diamond.png');
  this.load.spritesheet('woof', 
  'images/woof.png',
  { frameWidth: 32, frameHeight: 31 });
}

var input;

function create() {
  this.add.sprite(fullWidth/2, fullHeight/2, 'sky').setScale(fullWidth/800, fullHeight/600);

  input = this.input.mousePointer;

  player = this.physics.add.sprite(fullWidth/2, fullHeight/2, 'woof').setScale(2);
  player.flipX = true;

  player.setCollideWorldBounds(true);
}

var clicked = false;
var clickedX;
var clickedY;

function update() {
  let angle = Phaser.Math.Angle.Between(player.x,player.y, input.x, input.y);

  player.setRotation(angle);
  if(input.isDown && !clicked) {
    game.physics.arcade.moveToPointer(sprite, 400);

        //  if it's overlapping the mouse, don't move any more
    if (Phaser.Rectangle.contains(sprite.body, game.input.x, game.input.y))
    {
        sprite.body.velocity.setTo(0, 0);
    }
  }
  if(clicked && player.body.position.x == clickedX && player.body.position.y == clickedY) {
    player.setVelocityX(0);
    player.setVelocityY(0);
    clicked = false;
  }
}

function render() {

}

function listener() {
  console.log(game.input.mousePointer.x +", "+game.input.mousePointer.y);
}