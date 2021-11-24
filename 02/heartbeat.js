// 変数の宣言
let posX = 200; // 位置 X
let posY = 200; // 位置 Y

let size = 100;           // サイズ
let sizeMax = size * 2;   // 最大値
let sizeMin = size * 0.5; // 最小値

let mode = 'inflate';     // モード

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255, 255, 255); // 背景:白

  // サイズが最大値付近になったら
  if (size > (sizeMax - 1)) {
    mode = 'deflate'; // しぼみモードに移行
  }

  // サイズが最小値付近になったら
  if (size < (sizeMin + 1)) {
    mode = 'inflate'; // ふくらみモードに移行
  }

  // ふくらみ中
  if (mode == 'inflate') {
    size = size + (sizeMax - size) * 0.1; // size 増やす
  }

  // しぼみ中
  if (mode == 'deflate') {
    size = size - (size - sizeMin) * 0.2; // size 減らす
  }

  let red = size + 100; // 赤の値
  let c = color(red, 100, 100); // 色
  fill(c); // 塗りの色設定
  noStroke(); // アウトライン無し

  circle(posX, posY, size); // 円を描画
}