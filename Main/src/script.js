var mainImage = null;
var grayImage = null;
var redImage = null;
var blueImage = null;
var inverseImage = null;
var canvas = null;

function upload () { 
  var file = document.getElementById("img");
  mainImage = new SimpleImage(file);
  grayImage = new SimpleImage(file);
  redImage = new SimpleImage(file);
  blueImage = new SimpleImage(file);
  inverseImage = new SimpleImage(file);
  canvas = document.getElementById("can");
  mainImage.drawTo(canvas);
} 

function makeGrayScale () { 
  if (imageIsLoaded(mainImage)) {
    grayFilter();
    grayImage.drawTo(canvas);
  }
}

function makeRed () { 
  if (imageIsLoaded(mainImage)) {
    redFilter();
    redImage.drawTo(canvas);
  }
}

function makeBlue () { 
  if (imageIsLoaded(mainImage)) {
    blueFilter();
    blueImage.drawTo(canvas);
  }
}

function makeInverse () { 
  if (imageIsLoaded(mainImage)) {
    inverseFilter();
    inverseImage.drawTo(canvas);
  }
}

function reset () { 
  if (imageIsLoaded(mainImage)) {
    mainImage.drawTo(canvas);
    greyImage = mainImage;
    redImage = mainImage;
    blueImage = mainImage;
    inverseImage = mainImage;
  }
}

function imageIsLoaded (image) {
  if (image != null && image.complete()) {
    return true;
  }
  alert("Image not yet uploaded");
  return false;
}

function grayFilter () {
  grayImage = new SimpleImage(mainImage.getWidth(), mainImage.getHeight());
  for (var pixel of mainImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var newPixel = grayImage.getPixel(x, y);
    var avg = ( pixel.getRed() + pixel.getGreen() + pixel.getBlue() ) / 3;
    newPixel.setRed(avg);
    newPixel.setGreen(avg);
    newPixel.setBlue(avg);
  }
}

function redFilter () {
  redImage = new SimpleImage(mainImage.getWidth(), mainImage.getHeight());
  for (var pixel of mainImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var newPixel = redImage.getPixel(x, y);
    var avg = ( pixel.getRed() + pixel.getGreen() + pixel.getBlue() ) / 3;
    if (avg < 128) {
      newPixel.setRed(avg*2);
      newPixel.setGreen(0);
      newPixel.setBlue(0);
    } else {
      newPixel.setRed(255);
      newPixel.setGreen((avg*2)-255);
      newPixel.setBlue((avg*2)-255);
    }
  }
}

function blueFilter () {
  blueImage = new SimpleImage(mainImage.getWidth(), mainImage.getHeight());
  for (var pixel of mainImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var newPixel = blueImage.getPixel(x, y);
    var avg = ( pixel.getRed() + pixel.getGreen() + pixel.getBlue() ) / 3;
    if (avg < 128) {
      newPixel.setBlue(avg*2);
      newPixel.setGreen(0);
      newPixel.setRed(0);
    } else {
      newPixel.setBlue(255);
      newPixel.setGreen((avg*2)-255);
      newPixel.setRed((avg*2)-255);
    }
  }
}
  
  function inverseFilter () {
  inverseImage = new SimpleImage(mainImage.getWidth(), mainImage.getHeight());
  for (var pixel of mainImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var newPixel = inverseImage.getPixel(x, y);
    newPixel.setRed(255-pixel.getRed());
    newPixel.setGreen(255-pixel.getGreen());
    newPixel.setBlue(255-pixel.getBlue());
  }
}