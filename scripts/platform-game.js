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

var platforms;
var player;

function create() {
  this.add.sprite(fullWidth/2, fullHeight/2, 'sky').setScale(fullWidth/800, fullHeight/600);

  platforms = this.physics.add.staticGroup();

  platforms.create(fullWidth/2, fullHeight - 32, 'ground').setScale(fullWidth/400, 2).refreshBody();

  player = this.physics.add.sprite(fullWidth/4, window.innerHeight - 64 - 31, 'woof').setScale(2);

  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('woof', { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('woof', { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  player.body.setGravityY(1300);
  this.physics.add.collider(player, platforms);

  cursors = this.input.keyboard.addKeys(
  {left: Phaser.Input.Keyboard.KeyCodes.A,
  right: Phaser.Input.Keyboard.KeyCodes.D});
}

var flyTimer = 0;
var startFalling = false;

function update() {
  if(player.body.touching.down) {
    flyTimer = 0;
    startFalling = false;

    if(cursors.left.isDown) {
      player.setVelocityX(-300);

      player.anims.play('left', true);
    } else if(cursors.right.isDown) {
        player.setVelocityX(300);

        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);

        player.anims.play('left', false);
        player.anims.play('right', false);
    }

    if(this.input.activePointer.isDown) {
      flyTimer = 1;
      player.setVelocityY(-125);
      player.setGravityY(0);
    }
  } else if(flyTimer > 0 && flyTimer < 500 && this.input.activePointer.isDown) {
    flyTimer++;
    if(startFalling) {
      player.setVelocityY(-125);
      player.setGravityY(0);
      startFalling = false;
    }

    if(cursors.right.isDown) {

      player.angle += 2;
      player.angle = Math.min(45, player.angle);
      //run animation here instead

      player.setVelocityX(300);
    } else if(cursors.left.isDown) {
      player.angle -= 2;
      player.angle = Math.max(-45, player.angle);

      player.setVelocityX(-300);
      player.anims.play('left', true);
    } else {
      player.setVelocityX(0);

      player.angle = 0;
      player.anims.play('left', false);
      player.anims.play('right', false);
    }
  } else {
    if(!startFalling) {
      player.angle = 0;
      player.setVelocityX(0);
      player.setVelocityY(0);
      player.setGravityY(1300);
      player.anims.stop();
      startFalling = true;
    }
  }
}

function render() {

}