var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

fetch('font/04b03.json').then(function(response) { 
  return response.json();
}).then(function(data) {
  var font = data.font;

  var img = new Image();
  img.src = 'font/04b03.png';

  var str = "_Hello, World!";

  var buf = [];
      
  for ( var i = str.length - 1; i >= 0; i-- ) {
    buf.unshift(str[i].charCodeAt().toString());
  }

  var offsetX = 0;

  for (var i = 0; i < buf.length; i++) {
    var charIndex = font.chars.char.findIndex(function(obj) { return obj["_id"] === buf[i]; });
    var char = font.chars.char[charIndex];
    console.log(char);

    offsetY = 5 - char._height;

    ctx.drawImage(img, char._x, char._y, char._width, char._height, offsetX, offsetY, char._width, char._height);

    offsetX += parseInt(char._width) + 1; 
  }
});