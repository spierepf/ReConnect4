// Create TCP connection to Open Pixel Control server
var Socket = require("net").Socket;
var socket = new Socket();
socket.setNoDelay();
socket.connect(7890, "raspberrypi.local");

// Create an Open Pixel Control stream and pipe it to the server
var createOPCStream = require("opc");
var stream = createOPCStream();
stream.pipe(socket);

// Create a strand representing connected lights
var createStrand = require("opc/strand");
var strand = createStrand(64);


function red() {
  for (var i = 0; i < strand.length; i++) {
    strand.setPixel(i, 255, 0, 0);
  }
  stream.writePixels(0, strand.buffer);
}

function green() {
  for (var i = 0; i < strand.length; i++) {
    strand.setPixel(i, 0, 255, 0);
  }
  stream.writePixels(0, strand.buffer);
}

function blue() {
  for (var i = 0; i < strand.length; i++) {
    strand.setPixel(i, 0, 0, 255);
  }
  stream.writePixels(0, strand.buffer);
}

function black() {
  for (var i = 0; i < strand.length; i++) {
    strand.setPixel(i, 0, 0, 0);
  }
  stream.writePixels(0, strand.buffer);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

(async () => {
  while(true) {
    red()
    await sleep(990)
    black()
    await sleep(10)
    green()
    await sleep(990)
    black()
    await sleep(10)
    blue()
    await sleep(990)
    black()
    await sleep(10)
  }
})();
