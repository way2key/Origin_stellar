var t = 0.0;

function setup() {
  createCanvas(1990, 980);
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  var radius = 150;

  //beginShape();
  var xoff = 0;
  for (var a = 0; a < TWO_PI; a += 0.1) {
    var offset = map(noise(xoff, t), 0, 4, -15, 15);
    var r = radius + offset;
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
    xoff += 0.1;
    ellipse(x, y, 4, 4);
  }
  //endShape();

  t += 0.01;
}
