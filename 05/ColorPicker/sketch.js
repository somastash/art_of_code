let img; // 画像オブジェクトを入れる変数

// ファイル読み込み
function preload() {
  img = loadImage('img/Future Past Life by STRFKR.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
}

function draw() {
  image(img, 0, 0); // 画像を表示

  img.loadPixels(); // 画素データを読み込み

  // マウスの位置の色を取得
  let c = img.get(mouseX, mouseY);

  // 塗りの色を取得した色に指定
  fill(c);

  // マウスの位置に円を描画
  circle(mouseX, mouseY, 50);

  // 左上の色数値の表示
  fill('black');
  rect(0, 0, 150, 40);
  fill(c);
  textSize(16);
  text(c.toString(), 10, 25);
}

// By Satoshi Soma @ Dec. 22, 2021
// https://editor.p5js.org/amekusa/sketches/-iyVpSKwJ