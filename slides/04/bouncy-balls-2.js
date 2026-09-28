// キャンバスサイズ
let w = 400;
let h = 400;

let gravity = 0.2;   // 重力

let balls = [];      // ボール配列（空）
let numOfBalls = 24; // 使うボールの数


function setup() {
  createCanvas(w, h);

  // ボールをたくさん用意
  for (let i = 0; i < numOfBalls; i++) {
    let color  = random(0, 100);  // 色相
    let size   = random(10, 60);  // サイズ
    let weight = random(50, 100); // 重さ

    // ボールオブジェクト生成
    let newBall = createBall(color, size, weight);

    // 配列に追加
    balls.push( newBall );
  }
}

function draw() {
  // 背景
  fill('rgba(70, 50, 100, 0.2)'); // 半透明
  rect(0, 0, w, h);


  // 配列をループで回す
  for (let i = 0; i < balls.length; i++) {

    // マウスボタンを押していると引き寄せる
    if (mouseIsPressed) {
      attract(balls[i]);
    }

    fall(balls[i]);     // 重力作用
    move(balls[i]);     // ボールを動かす
    bound(balls[i]);    // 壁に跳ね返る
    drawBall(balls[i]); // ボールを描画
  }
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
    vx: random(-10, 10),    // 速度:X (ベクトル)
    vy: random(-10, 10),    // 速度:Y (ベクトル)
  };
  return ball; // 返り値
}


// ボールを描画する関数
function drawBall(ball) {
  push();

  // 描画基準点をボールの位置に
  translate(ball.x, ball.y);

  // ボールの色で描画
  colorMode(HSL, 100);
  fill(ball.color, 70, 50);
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

// By Satoshi Soma @ Dec. 16, 2021
// https://editor.p5js.org/amekusa/sketches/FIM3H8feO
