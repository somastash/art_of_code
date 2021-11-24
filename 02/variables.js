// 変数の宣言
var posX = 200; // 位置 X
var posY = 200; // 位置 Y

var size = 100; // 大きさ
var msg = 'Hello World!'; // メッセージ

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220); // 背景を塗る (明度: 220)

  circle(posX, posY, size); // 円を描画

  textSize(size * 0.2); // テキストサイズ設定
  text(msg, posX, posY); // テキストを描画
}