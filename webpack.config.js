const path = require("path")

module.exports = {
  entry: [
    "./js/server.js",
    "./js/util.js",
    "./js/debounce.js",
    "./js/form.js",
    "./js/data.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/dragAndDrop.js",
    "./js/filter.js",
    "./js/uploadPhoto.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
