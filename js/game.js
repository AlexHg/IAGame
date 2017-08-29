var game = new Phaser.Game(1200, 750, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','img/tiles/grass.jpg');
    game.load.spritesheet('player','img/sprites/1.png',48,48);
    game.load.image('coin', 'img/other/coin.png');
    game.load.spritesheet('three','img/tiles/blocks.png',60,96);

}

var limitX = 2200;
var limitY = 1050;
var player;
var cursors;
var coords = [];
var coinLen = 2;
var threeLen = 40;


var collite = false;
var lastMove = 0;

/*function fireKeyboardEvent(event, keycode) {
    var keyboardEvent = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events");

    if(keyboardEvent.initEvent) {
        keyboardEvent.initEvent(event, true, true);
    }

    keyboardEvent.keyCode = keycode;
    keyboardEvent.which = keycode;

    document.dispatchEvent ? document.dispatchEvent(keyboardEvent) 
                           : document.fireEvent(event, keyboardEvent);
  }
*/
function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}



function createCoin(x, y){
    var coin = game.add.sprite(x, y, 'coin');
    game.physics.p2.enable(coin);
    coin.body.static = true;
    coin.body.onBeginContact.add(function(arr){
        var coin = this[1];
        document.querySelector("#coin-sound").play();
        coin.kill();
        updateCoinCounter();
    }, [this, coin]);
} 

function createThree(x,y){
    var three = game.add.sprite(x, y, 'three');
    game.physics.p2.enable(three);
    three.body.static = true;
    three.body.onBeginContact.add(function(){
        document.querySelector("#block-sound").play();
        console.log("choque");
    }, null);
}

function checkCoords(x,y){
    return coords.indexOf(x+","+y) > -1;
}

function addCoords(x,y){
    coords[coords.length] = x+","+y;
}

function updateCoinCounter(){
    var coins = document.querySelector("#coincount");
    if(parseInt(coins.innerText) < 9) coins.innerText = '0'+(parseInt(coins.innerText) + 1);
    else coins.innerText = parseInt(coins.innerText) + 1;
    if(parseInt(coins.innerText) >= coinLen){
        document.querySelector("#win-sound").play();
        alert("GANASTE");
        location.reload();
    }
}

function create() {
    
    document.querySelector("#background-music").volume = 0.2;
    game.add.tileSprite(0, 0, limitX, limitY, 'background');

    game.world.setBounds(0, 0, limitX, limitY);
    
    game.physics.startSystem(Phaser.Physics.P2JS);

    //Player Declarations
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    player.animations.add('down',[0,1,2]);
    player.animations.add('left',[12,13,14]);
    player.animations.add('right',[24,25,26]);
    player.animations.add('up',[36,37,38]);
    
    game.physics.p2.enable(player);

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);
    

    //Distribuye fichas por todo el mapa
    for(var i = 0; i < coinLen+5; i++){

        var x = Math.floor((Math.random() * limitX));
        var y = Math.floor((Math.random() * limitY));

        while( checkCoords(x,y) ){
            x = Math.floor((Math.random() * limitX));
            y = Math.floor((Math.random() * limitY));
        }

        createCoin(x,y);
        addCoords(x,y);
    }
    for(var i = 0; i < threeLen; i++){

        var x = Math.floor((Math.random() * limitX));
        var y = Math.floor((Math.random() * limitY));

        while( checkCoords(x,y) ){
            x = Math.floor((Math.random() * limitX));
            y = Math.floor((Math.random() * limitY));
        }

        createThree(x,y);
        addCoords(x,y);
    }

    
    
}


function update() {
    player.body.setZeroVelocity();
    player.body.fixedRotation = true;
    
    if (cursors.up.isDown )
    {
        player.body.moveUp(200)
        player.animations.play('up', 5, true);
    }
    else if (cursors.down.isDown)
    {
        player.animations.play('down', 5, true);
        player.body.moveDown(200);
    }
    else if (cursors.left.isDown)
    {
        player.animations.play('left', 5, true);
        player.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        player.animations.play('right', 5, true);
        player.body.moveRight(200);
    }else{
        ///player.animations.play('down', 0, true);
    }
    //player.body.setZeroVelocity();
}

function render() {

    //game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.spriteCoords(player, 32, 500);
    

}


