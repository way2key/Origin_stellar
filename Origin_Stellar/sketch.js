//variables
var t = 0.0;
var textures;
var rays = [];

function preload(){
  //Load Textures
  sun = loadImage("textures/soleil.jpg");
  t1 = loadImage("textures/t1.jpg");
  t2 = loadImage("textures/t2.jpg");
  t3 = loadImage("textures/t3.jpg");
  t4 = loadImage("textures/t4.jpg");
  t5 = loadImage("textures/t5.jpg");
  t6 = loadImage("textures/t6.jpg");
  t7 = loadImage("textures/t7.jpg");
  textures = [t1,t2,t3,t4,t5,t6,t7];
}

function setup() {
  // Canvas
  createCanvas(1990, 980, WEBGL);
  //noLoop();

  // Rays
  let nRays = 12;
  for(let a = 0; a < TWO_PI ; a += TWO_PI / nRays){
    var r = new Ray(1200, 6, a, TWO_PI / nRays, textures);
    rays.push(r)
  }
}

function draw() {
  // Scene
  var radius = width * 0.18;
  translate(0,0,-radius*2);
  background(0);
  ambientLight(180, 180, 180);

  push();
  rotateZ(frameCount * -0.0003);
  for(let ray of rays){
    ray.show();
    ray.update();
  }
  pop();

  //Sun
  push();
  rotateY(PI / 2);
  rotateY(frameCount * 0.003);
  noStroke();
  texture(sun);
  sphere(radius / 2);
  pop();






}

class Ray {
  constructor(raySize, nSectors, startAngle, incrementAngle, textures) {
    this.raySize = raySize;
    this.nSectors = nSectors;
    this.startAngle = startAngle;
    this.incrementAngle = incrementAngle;
    this.textures = textures;
    this.sectors = [];
    this.sizes = [];


    for(let i = 0; i < this.nSectors ; ++i){
      let size = this.raySize / this.nSectors;
      let n = random(0.8,1.1)
      this.sizes.push(n * size);
    }

    for(let i = 0; i < this.nSectors ; ++i){
      let size = this.raySize / this.nSectors;
      var s = new Sector(i, size , this.textures, this);
      this.sectors.push(s);
    }
  }

  show() {
    for(let sector of this.sectors){
      sector.show();
    }
  }

  show1() {
    let s = this.raySize / this.nSectors;
    let sizes = [];
    for(let i = 0; i < this.nSectors ; ++i){
      t += 0.00084;
      //let n = map(sin(t) + noise(t),-1,2,0.4,1,true);
      let n = random(0.8,1.1);
      sizes.push(s * n);

      texture(this.textures[i]);
      textureMode(NORMAL);
      beginShape();
      vertex(sumRayOffset(sizes,i)     * cos(this.startAngle)                       , sumRayOffset(sizes,i)     * sin(this.startAngle)                      , 0 , 0 , 0);
      vertex(sumRayOffset(sizes,(i+1)) * cos(this.startAngle)                       , sumRayOffset(sizes,(i+1)) * sin(this.startAngle)                      , 0 , 1 , 0);
      vertex(sumRayOffset(sizes,(i+1)) * cos(this.startAngle + this.incrementAngle) , sumRayOffset(sizes,(i+1)) * sin(this.startAngle + this.incrementAngle), 0 , 1 , 1);
      vertex(sumRayOffset(sizes,i)     * cos(this.startAngle + this.incrementAngle) , sumRayOffset(sizes,i)     * sin(this.startAngle + this.incrementAngle), 0 , 0 , 1);
      endShape();
    }
  }

  show2() {
    noStroke();
    let s = this.raySize / this.nSectors;

    for(let i = 0; i < this.nSectors ; ++i){
      t += 0.00084;
      let n = map(sin(t) + noise(t),-1,2,0.8,1.2,true);
      fill(random(255),random(255),random(255));
      beginShape();
      vertex(s * i            * cos(this.startAngle)                        , s * i             * sin(this.startAngle));
      vertex(s * (i + 1) * n  * cos(this.startAngle)                        , s * (i + 1) * n   * sin(this.startAngle));
      vertex(s * (i + 1) * n  * cos(this.startAngle + this.incrementAngle)  , s * (i + 1) * n   * sin(this.startAngle + this.incrementAngle));
      vertex(s * (i)          * cos(this.startAngle + this.incrementAngle)  , s * (i)           * sin(this.startAngle + this.incrementAngle));
      endShape();
    }
  }

  update() {
    for(let sector of this.sectors){
      sector.update();
    }
    this.sizes = [];
    for(let sector of this.sectors){
      this.sizes.push(sector.size);
    }

  }
}

class Sector {
  constructor(index, size, textures, papa) {
    this.index = index;
    this.textures = textures;
    this.size = size;
    this.papa = papa;
  }

  show() {
    let i = this.index;
    texture(this.textures[i]);
    textureMode(NORMAL);
    beginShape();
    vertex(sumRayOffset(this.papa.sizes,i)     * cos(this.papa.startAngle)                       , sumRayOffset(this.papa.sizes,i)     * sin(this.papa.startAngle)                      , 0 , 0 , 0);
    vertex(sumRayOffset(this.papa.sizes,(i+1)) * cos(this.papa.startAngle)                       , sumRayOffset(this.papa.sizes,(i+1)) * sin(this.papa.startAngle)                      , 0 , 1 , 0);
    vertex(sumRayOffset(this.papa.sizes,(i+1)) * cos(this.papa.startAngle + this.papa.incrementAngle) , sumRayOffset(this.papa.sizes,(i+1)) * sin(this.papa.startAngle + this.papa.incrementAngle), 0 , 1 , 1);
    vertex(sumRayOffset(this.papa.sizes,i)     * cos(this.papa.startAngle + this.papa.incrementAngle) , sumRayOffset(this.papa.sizes,i)     * sin(this.papa.startAngle + this.papa.incrementAngle), 0 , 0 , 1);
    endShape();
  }

  update() {
    //this.size += map(sin(t),-1,1,-1,1.2,true);
    //t += 0.001;

    let a = 1;
    this.size += random(-a,a) ;
    t+= 1;

  }
}

function sumRayOffset(array, index){
  var cout =  width * 0.14 / 2;
  for(let i=0; i < index; ++i){
    cout += array[i];
  }
  return cout;
}
