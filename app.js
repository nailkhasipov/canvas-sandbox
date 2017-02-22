var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

fetch('font/04b03.json').then(function(response) { 
  return response.json();
}).then(function(data) {
  var font = data.font;

  var img = new Image();
  img.src = 'font/04b03.png';

  var str = "Hello, World and Me!";

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