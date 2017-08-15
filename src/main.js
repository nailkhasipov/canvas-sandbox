/*eslint no-undef: "error"*/
/*eslint-env node, browser*/
'use strict';

var Game = require('./../lib/Game');
var assets = require('./../lib/assets');

var game = new Game({ load: load, update: update, draw: draw });
console.log(game);

function load() {
  console.log('load!');
  console.log(game);
  // game.foo();
  // game.load.image('sky', 'assets/sky.png');
}

function update() {

}

assets.load([
  'assets/font/04b03.png',
]).then(function () {
  return setup();
});

function setup() {
  var imageObject = assets['assets/font/04b03.png'];
  console.log(imageObject);
}

var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

var groundY = 40;
var gravity = 0.2;
var speed = 2;

var player = { x: 10, y: groundY, jumping: false, velY: 0, img: '/assets/player.png' };
var playerImage = new Image();
playerImage.src = player.img;

document.addEventListener('keydown', function(e) {
  if(e.keyCode == 88 && player.jumping == false) {
    player.jumping = true;
    player.velY = -speed*2;
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.velY += gravity;
  player.y += player.velY;

  if(player.y >= groundY){
    player.y = groundY;
    player.jumping = false;
  }

  drawGround();
  drawPlayer();

  requestAnimationFrame(draw);
}

draw();

function drawPlayer() {
  ctx.drawImage(playerImage, 10, player.y);
}

function drawGround() {
  ctx.beginPath();
  ctx.moveTo(0,52.5);
  ctx.lineTo(128,52.5);
  ctx.lineWidth = 1;
  ctx.stroke();
}
