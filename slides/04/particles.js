let w = 400;
let h = 400;

let step = 20;
let size = 20;
let speedX = 0.01;
let speedY = 0.01;

let time = 0;
let timeSpeed = 1;
let seed = 0;

function setup() {
  createCanvas(w, h);
}

function draw() {
  background(200);

  randomSeed(seed);

  timeSpeed = mouseX - (w / 2);

  noStroke();

  for (let x = 0; x < w; x += step) {
    for (let y = 0; y < h; y += step) {
      let shiftX = random(-1, 1) * time * speedX;
      let shiftY = random(-1, 1) * time * speedY;
      let posX = x + shiftX;
      let posY = y + shiftY;
      circle(posX, posY, size);
    }
  }

  translate(10, 10);
  fill(color(0,0,0,127));
  rect(0, 0, 120, 50);
  fill('white');
  text('time: ' + round(time), 10, 20);
  text('timeSpeed: ' + round(timeSpeed), 10, 40);
  time += timeSpeed;
}

function mousePressed() {
  time = 0;
  seed = random(0, 100);
}