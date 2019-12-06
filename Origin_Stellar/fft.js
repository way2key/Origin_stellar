function preload(){
  sound = loadSound('lolo.mp3');
}

function setup(){
  createCanvas(1000,1000, WEBGL);
  //angleMode(DEGREES);
  button = createButton('toggle');
  button.mouseClicked(togglePlay);
  fft = new p5.FFT(0.4,1024);
  sound.amp(0.2);
}

function draw(){
  background(0);
  fft.analyze();
  fft.smooth();
  var spectrum = fft.analyze();
  console.log(spectrum);
  noStroke();
  //push();
  rotateZ(frameCount * 0.002);
  //translate(width / 2, height / 2);

beginShape();
noStroke();
vertex(0,0);
  for (let i = 0; i < spectrum.length/3; ++i) {
    //var angle = i * TWO_PI / spectrum.length;
    var angle = map(i,0,spectrum.length/3, 0, TWO_PI);
    var amp = spectrum[i];
    var r = map(amp, 0, 255, 50, 225);
    var x = r * cos(angle);
    var y = r * sin(angle);
    fill(255,50,30,50);
    //stroke(i,255,255);
    vertex(x,y);
  }
  vertex(map(spectrum[0], 0, 255, 50, 225),0);
  endShape();
//  pop();

}

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}
