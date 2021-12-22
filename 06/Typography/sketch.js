let font;
let points;
let message = 'Do Not Repeat Yourself.';
let size = 80;
let x = 45;
let y = 210;

function preload() {
  font = loadFont('fonts/AguafinaScript-Regular.ttf');
}

function setup() {
  createCanvas(640, 400);
  
  // テキストのアウトラインを取得
  points = font.textToPoints(message, x, y, size, {
    sampleFactor: 0.5,
    simplifyThreshold: 0
  });
}

function draw() {
  background(255);
  
  // ノイズの強さ
  // マウスが中心から離れるほど強くなる
  let noise = dist(width/2, height/2, mouseX, mouseY) * 0.02;

  fill('#ED225D');

  // アウトライン描画開始
  beginShape();
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    vertex(p.x + random(-noise, noise), p.y); // 頂点
  }
  endShape(); // アウトライン終了
}


// By Satoshi Soma @ Dec. 23, 2021
// https://editor.p5js.org/amekusa/sketches/XcKPoUYOH