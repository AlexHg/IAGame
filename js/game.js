var game = new Phaser.Game(1200, 750, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','img/tiles/grass.jpg');
    game.load.spritesheet('player','img/sprites/1.png',48,48);

}

var player;
var cursors;


function create() {

    game.add.tileSprite(0, 0, 1200, 750, 'background');

    game.world.setBounds(0, 0, 1200, 750);

    game.physics.startSystem(Phaser.Physics.P2JS);

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

    player.animations.add('down',[0,1,2]);
    player.animations.add('left',[12,13,14]);
    player.animations.add('right',[24,25,26]);
    player.animations.add('up',[36,37,38]);
    

    game.physics.p2.enable(player);

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);

}

function update() {
    
    player.body.setZeroVelocity();

    if (cursors.up.isDown)
    {
        player.body.moveUp(200)
        player.animations.play('up', 5, true);
    }
    else if (cursors.down.isDown)
    {
        player.animations.play('down', 5, true);
        player.body.moveDown(200);
    }

    if (cursors.left.isDown)
    {
        player.animations.play('left', 5, true);
        player.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        player.animations.play('right', 5, true);
        player.body.moveRight(200);
    }
    //player.body.setZeroVelocity();
}

function render() {

    //game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.spriteCoords(player, 32, 500);

}