// キャンバスサイズ
let w = 400;
let h = 400;

let ballA; // ボールA
let ballB; // ボールB

function setup() {
  createCanvas(w, h);

  // ボールAオブジェクトを作成
  ballA = {
    color: 'red', // 色
    size:  30,    // サイズ
    x: random(20, w - 20), // 位置X
    y: random(20, h - 20)  // 位置Y
  };

  // ボールBオブジェクトを作成
  ballB = {
    color: 'blue', // 色
    size:  50,    // サイズ
    x: random(20, w - 20), // 位置X
    y: random(20, h - 20)  // 位置Y
  };

}

function draw() {
  background(220);

  // ボールを描画
  drawBall(ballA);
  drawBall(ballB);
}


// ボールを描画する関数
// 引数: 描画したいボールオブジェクト
function drawBall(ball) {
  fill(ball.color);
  circle(ball.x, ball.y, ball.size);
}


// By Satoshi Soma @ Dec. 16, 2021
// https://editor.p5js.org/amekusa/sketches/UulZcFAl-