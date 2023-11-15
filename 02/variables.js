// 変数の宣言
let x = 100; // 横位置
let y = 150; // 縦位置
let size = 50; // 大きさ
let msg = 'Hello World!'; // メッセージ

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220); // 背景を塗る (明度: 220)

  circle(x, y, size); // 円を描画

  // テキスト描画
  textSize(20); // テキストサイズ設定
  text(msg, x, y); // テキストを円の位置に描画
}