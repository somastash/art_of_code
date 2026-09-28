function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  smiley(100, 200); // スマイリーを 座標:100,200 に表示
}

/**
 * スマイリーを 座標:x,y に表示する関数
 */
function smiley(x, y) {
  let eyeSize  = 5;       // 変数:目のサイズ
  let eyeColor = 'black'; // 変数:目の色

  push(); // 座標原点を保存
  translate(x, y); // 座標原点を x, y にずらす

  circle(0, 0, 50); // 顔
  fill(eyeColor); // 塗りの色をセット
  circle(-10, -10, eyeSize); // 左目
  circle(10, -10, eyeSize);  // 右目
  noFill(); // 塗り無し
  arc(0, 0, 35, 35, 0, radians(180)); // 口

  pop(); // 保存した座標原点をロード
}