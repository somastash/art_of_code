// キャンバスサイズ
let w = 400;
let h = 400;

// 重力
let gravity = 0.2;

// ボールA, B
let ballA;
let ballB;


function setup() {
  createCanvas(w, h);

  // ボールオブジェクトを生成
  ballA = createBall("red",  30, 50); // 色, サイズ, 重さ
  ballB = createBall("blue", 50, 70); // 色, サイズ, 重さ
}

function draw() {
  // 背景
  fill('rgba(70, 50, 100, 0.2)'); // 半透明
  rect(0, 0, w, h);

  // マウスボタンを押している時、引き寄せる
  if (mouseIsPressed) {
    attract(ballA);
    attract(ballB);
  }

  // 重力の作用
  fall(ballA);
  fall(ballB);

  // ボールを動かす
  move(ballA);
  move(ballB);

  // 壁で跳ね返る
  bound(ballA);
  bound(ballB);

  // ボールを描画
  drawBall(ballA);
  drawBall(ballB);
}


// ボールオブジェクトを生成して返す関数
// 引数: 色, サイズ, 重さ
function createBall(col, sz, wt) {
  let ball = {
    color:  col,
    size:   sz,
    weight: wt,
    x:  random(20, w - 20), // 位置:X
    y:  random(20, h - 20), // 位置:Y
    vx: random(-5, 5),      // 速度:X (ベクトル)
    vy: random(-5, 5),      // 速度:Y (ベクトル)
  };
  return ball; // 返り値
}


// ボールを描画する関数
function drawBall(ball) {
  push();

  // 描画基準点をボールの位置に
  translate(ball.x, ball.y);

  // ボールの色で描画
  fill(ball.color);
  stroke('white'); // 輪郭白
  strokeWeight(2);
  circle(0, 0, ball.size);

  // ハイライト
  fill('white');
  noStroke();
  circle(-ball.size / 4, -ball.size / 4, ball.size / 4);

  // V キーを押すとベクトル表示
  if (keyIsDown(86)) {
    stroke('yellow');
    strokeWeight(4);
    line(0, 0, ball.vx * 3, ball.vy * 3);
  }

  pop(); // 基準点リセット
}


// ボールをマウスに引き寄せる関数
function attract(ball) {
  let force = 100 / ball.weight;
  ball.vx = ball.vx + (mouseX - ball.x) * force * 0.005;
  ball.vy = ball.vy + (mouseY - ball.y) * force * 0.005;
}


// ボールに重力をかける関数
function fall(ball) {
  ball.vy = ball.vy + gravity;
}


// ボールを動かす関数
function move(ball) {

  // 位置に速度を足し算する
  ball.x = ball.x + ball.vx;
  ball.y = ball.y + ball.vy;
}


// ボールを壁でバウンドさせる関数
function bound(ball) {
  let force = 100 / ball.weight;

  if (ball.x > w) {        // 右壁
    ball.x = w;
    ball.vx = ball.vx * force * -0.4;

  } else if (ball.x < 0) { // 左壁
    ball.x = 0;
    ball.vx = ball.vx * force * -0.4;
  }

  if (ball.y > h) {        // 地面
    ball.y = h;
    ball.vy = ball.vy * force * -0.4;

  } else if (ball.y < 0) { // 天井
    ball.y = 0;
    ball.vy = ball.vy * force * -0.4;
  }
}

// By Satoshi Soma @ Dec. 15, 2021
// https://editor.p5js.org/amekusa/sketches/_AV0PDuJr
