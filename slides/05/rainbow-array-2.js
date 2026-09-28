let lines = [];  // 空の配列
let nLines = 21; // 線の数


function setup() {
  createCanvas(400, 400);

  // 線オブジェクトを 21 個生成し、配列に入れる
  for (let i = 0; i < nLines; i++) {
    let newLine = {};             // オブジェクト生成
    newLine.h = 0;                // 長さ
    newLine.grow = random(1, 10); // 伸びる速さ
    lines.push( newLine );        // 配列に追加
  }
}

function draw() {
  colorMode(HSL, 400); // HSLモード, 最大値400

  // 背景
  fill(0, 0, 0);
  noStroke();
  rect(0, 0, 400, 400);

  // 虹
  for (let i = 0; i < lines.length; i++) {

    stroke(lines[i].h, 300, 200); // 線の色
    strokeWeight(20);             // 線の太さ

    // 線を少し伸ばす
    lines[i].h += lines[i].grow;

    // 始点 X, Y
    let x1 = i * 20;
    let y1 = 0;

    // 終点 X, Y
    let x2 = x1;
    let y2 = lines[i].h;

    // 線を描画
    line(x1, y1, x2, y2);
  }
}

// By Satoshi Soma @ Dec. 22, 2021
// https://editor.p5js.org/amekusa/sketches/OrVlqvNT7