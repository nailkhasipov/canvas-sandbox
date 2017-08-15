/*eslint-env node, browser*/
'use strict';

var assets = require('./../lib/assets');

// var Game = function(config) {
//   this.load = function() {
//     console.log("called load function!");
//   };
//
//   config.load();
// };

function Game (config) {
  this.foo = function() {
    console.log("called load function!");
  };

  config.load();
}

module.exports = Game;
