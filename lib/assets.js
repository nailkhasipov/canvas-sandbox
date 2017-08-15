// module.exports = {
//   init: function() {
//     console.log("Hello form assets lib!");
//   }
// }

/*
assets
------

This is an object to help you load and use game assets, like images, fonts and sounds,
and texture atlases.
Here's how to use to load an image, a font and a texture atlas:

    assets.load([
      "images/cat.png",
      "fonts/puzzler.otf",
      "images/animals.json",
    ]).then(() => setup());

When all the assets have finsihed loading, the makeSprites function
will run. (Replace makeSprites with an other function you need).
When you've loaded an asset, you can acccess it like this:

    imageObject = assets["images/cat.png"];

Access individual frames in a texture atlas using the frame's name, like this:

    frame = assets["hedgehog.png"];

(Just use the image name without the extension.)

*/

"use strict";

module.exports = {

  init: function() {
    console.log("Hello form assets lib!");
  },

  //Properties to help track the assets being loaded
  toLoad: 0,
  loaded: 0,

  //File extensions for different types of assets
  imageExtensions: ["png", "jpg", "gif"],
  jsonExtensions: ["json"],

  //The `load` method creates and loads all the assets. Use it like this:
  //`assets.load(["images/anyImage.png", "fonts/anyFont.otf"]);`
  load: function load(sources) {
    var _this = this;

    //The `load` method will return a Promise when everything has
    //loaded
    return new Promise(function (resolve) {

      //The `loadHandler` counts the number of assets loaded, compares
      //it to the total number of assets that need to be loaded, and
      //resolves the Promise when everything has loaded
      var loadHandler = function loadHandler() {
        _this.loaded += 1;
        console.log(_this.loaded);

        //Check whether everything has loaded
        if (_this.toLoad === _this.loaded) {

          //Reset `toLoad` and `loaded` to `0` so you can use them
          //to load more assets later if you need to
          _this.toLoad = 0;
          _this.loaded = 0;
          console.log("Assets finished loading");

          //Resolve the promise
          resolve();
        }
      };

      //Display a console message to confirm that the assets are
      //being loaded
      console.log("Loading assets...");

      //Find the number of files that need to be loaded
      _this.toLoad = sources.length;

      //Loop through all the source file names and find out how
      //they should be interpreted
      sources.forEach(function (source) {
        //Find the file extension of the asset
        var extension = source.split(".").pop();

        //Load images that have file extensions that match
        //the imageExtensions array
        if (_this.imageExtensions.indexOf(extension) !== -1) {
          _this.loadImage(source, loadHandler);
        }
        //Load JSON files
        else if (_this.jsonExtensions.indexOf(extension) !== -1) {
            _this.loadJson(source, loadHandler);
          }
          //Display a message if a file type isn't recognized
          else {
              console.log("File type not recognized: " + source);
            }
      });
    });
  },
  loadImage: function loadImage(source, loadHandler) {
    //Create a new image and call the `loadHandler` when the image
    //file has loaded
    var image = new Image();
    image.addEventListener("load", loadHandler, false);
    //Assign the image as a property of the `assets` object so
    //you can access it like this: `assets["path/imageName.png"]`
    this[source] = image;

    //Alternatively, if you only want the file name without the full
    //path, you can get it like this:
    //image.name = source.split("/").pop();
    //this[image.name] = image;
    //This will allow you to access the image like this:
    //assets["imageName.png"];

    //Set the image's `src` property to start loading the image
    image.src = source;
  },
  loadJson: function loadJson(source, loadHandler) {
    var _this2 = this;

    //Create a new `xhr` object and an object to store the file
    var xhr = new XMLHttpRequest();

    //Use xhr to load the JSON file
    xhr.open("GET", source, true);

    //Tell xhr that it's a text file
    xhr.responseType = "text";

    //Create an `onload` callback function that
    //will handle the file loading
    xhr.onload = function (event) {
      //Check to make sure the file has loaded properly
      if (xhr.status === 200) {
        //Convert the JSON data file into an ordinary object
        var file = JSON.parse(xhr.responseText);
        //Get the file name
        file.name = source;
        //Assign the file as a property of the assets object so
        //you can access it like this: `assets["file.json"]`
        _this2[file.name] = file;
        //Texture atlas support:
        //If the JSON file has a `frames` property then
        //it's in Texture Packer format
        if (file.frames) {
          //Create the tileset frames
          _this2.createTilesetFrames(file, source, loadHandler);
        } else {
          //Alert the load handler that the file has loaded
          loadHandler();
        }
      }
    };
    //Send the request to load the file
    xhr.send();
  }
};
