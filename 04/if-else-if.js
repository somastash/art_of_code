// if, else if の用例

let w = 400;
let h = 400;

function setup() {
  createCanvas(w, h);
}

function draw() {
  background(255);
  noStroke();

  if (mouseY < h/2) {
    fill('rgba(255, 0, 0, 0.5)'); // 赤
    rect(0, 0, w, h/2);

  } else if (mouseX < w/2) {
    fill('rgba(0, 255, 0, 0.5)'); // 緑
    rect(0, 0, w/2, h);

  } else if (mouseX > w/2) {
    fill('rgba(0, 0, 255, 0.5)'); // 青
    rect(w/2, 0, w/2, h);
  }

  // マウスと中心点の距離が 50 未満なら
  if (dist(mouseX, mouseY, w/2, h/2) < 50) {
    fill('rgba(255, 255, 0, 0.5)'); // 黄
    circle(w/2, h/2, 100);
  }

  // NOTE:
  // rect() は四角を描画する関数
  // rect(始点X, 始点Y, 幅, 高さ);

  // NOTE:
  // circle() は円を描画する関数
  // circle(中心X, 中心Y, 直径);

  // NOTE:
  // dist() は2点間の距離を計算する関数
  // dist(点1X, 点1Y, 点2X, 点2Y);
  // 距離の数値を返り値として出力する。
}

// By Satoshi Soma @ Dec 9, 2021
// https://editor.p5js.org/amekusa/sketches/3YAjHkOI-
