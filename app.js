var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var groundY = 40;
var gravity = 0.2;
var speed = 2;

player = { x: 10, y: groundY, jumping: false, velY: 0, img: 'player.png' }
var playerImage = new Image();
playerImage.src = player.img;

fetch('font/04b03.json').then(function(response) { 
  return response.json();
}).then(function(data) {
  var font = data.font;

  var img = new Image();
  img.src = 'font/04b03.png';

  var str = "Hello, World!";

  var buf = [];
      
  for ( var i = str.length - 1; i >= 0; i-- ) {
    var charCode = str[i].charCodeAt().toString();
    buf.unshift(charCode);
  }

  var offsetX = 0;

  for (var i = 0; i < buf.length; i++) {
    var charIndex = font.chars.char.findIndex(function(obj) { return obj["_id"] === buf[i]; });
    var char = font.chars.char[charIndex];

    if ( buf[i] === "44" ) {
      offsetY = 6 - char._height;
    } else {
      offsetY = 5 - char._height;
    }

    ctx.drawImage(img, char._x, char._y, char._width, char._height, offsetX, offsetY, char._width, char._height);

    if ( buf[i] === "32" ) {
      offsetX += parseInt(char._width) + 3;
    } else {
      offsetX += parseInt(char._width) + 1;
    }
  }
});

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

document.addEventListener("keydown", function(e) {
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
