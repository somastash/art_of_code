let se; // サウンドオブジェクト

let arr = []; // オブジェクト入れる配列

function preload() {
  se = loadSound('se.mp3');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(color(0, 0, 0, 0.5));

  // 全オブジェクトの位置や速度を更新
  for (let i = 0; i < arr.length; i++) {
    let obj = arr[i];
    gravity(obj);
    slower(obj);
    move(obj);
    wallBound(obj);
  }

  // 全オブジェクトを描画
  for (let i = 0; i < arr.length; i++) {
    let obj = arr[i];
    circle(obj.x, obj.y, obj.size);
  }
}

// この関数は
// マウスクリックで実行されます。
function mouseClicked() {

  // オブジェクト生成
  createObject(mouseX, mouseY);
}


// オブジェクトを生成する関数
function createObject(x, y) {

  // 生成
  let obj = {
    x: x,
    y: y,
    vx: random(-20, 20),
    vy: 0,
    size: random(10, 100)
  };

  // 生成したオブジェクトを配列に保存
  arr.push(obj);
}

// オブジェクトをベクトル方向に動かす関数
function move(obj) {
  obj.x += obj.vx;
  obj.y += obj.vy;
}

// オブジェクトに重力をかける関数
function gravity(obj) {
  obj.vy += 1;
}

// オブジェクトの速度を減衰させる関数
function slower(obj) {
  obj.vx *= 0.99;
  obj.vy *= 0.99;
}

// オブジェクトを壁でバウンドさせる関数
function wallBound(obj) {
  if (obj.x < 0) {
    obj.x = 0;
    obj.vx *= -1;
    sound(obj, obj.vx);

  } else if (obj.x > width) {
    obj.x = width;
    obj.vx *= -1;
    sound(obj, obj.vx);
  }

  if (obj.y > height) {
    obj.y = height;
    obj.vy *= -1;
    sound(obj, obj.vy);
  }
}

// オブジェクトを鳴らす関数
function sound(obj, vol) {

  vol = abs(vol);
  vol = map(vol, 0, 10, 0, 1);

  // 再生速度 = 音のピッチ
  // オブジェクトが大きいほど音が低くなる
  let rate = map(obj.size, 0, 100, 1.5, 0.5);

  // vol が 0.1 以上なら再生する
  if (vol > 0.1) {

    // 再生
    se.play(
      0,    // 再生までのディレイ
      rate, // 再生速度
      vol,  // 音量
      0.7   // 再生開始秒
    );

  }

}

/* @author amekusa */
