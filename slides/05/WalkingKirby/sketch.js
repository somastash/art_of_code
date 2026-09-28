// このサンプルコードでは、
// 全フレームのアニメパターンが描かれた一枚の画像を使います。


// カービィオブジェクト
let k = {
  x: 150,
  y: 200,

  w: 23,
  h: 20,

  anim: 0.0,    // アニメフレーム番号
  animMax: 9.0, // アニメフレーム番号最大
  animSpd: 0.1, // アニメ速度

  img: 0,       // 画像格納用プロパティ
  cropX: 0,     // 画像切り抜き始点 X
  cropY: 0,     // 画像切り抜き始点 Y
  cropW: 23,    // 画像切り抜き幅
  cropH: 20,    // 画像切り抜き高さ
};

function preload() {
  // 画像読み込み、格納
  k.img = loadImage('kirby-walk.png');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('antiquewhite');

  k.anim += k.animSpd; // アニメフレームを進める
  k.anim = k.anim % (k.animMax + 1); // フレームをループ

  // アニメフレーム番号、小数点切り捨て
  let animFrame = floor(k.anim);

  // アニメフレーム番号表示
  text('k.anim: ' + k.anim, 45, 20);
  text('animFrame: ' + animFrame, 20, 40);

  // 座標をカービィ基準に
  push();
  translate(k.x, k.y);

  // 画像描画
  image(
    k.img, // 画像

    0, // 表示位置 X
    0, // 表示位置 Y

    k.w, // 表示サイズ W
    k.h, // 表示サイズ H

    // 切り取り始点
    k.cropX + (k.cropW * animFrame),
    k.cropY,

    // 切り取りサイズ
    k.cropW,
    k.cropH
  );

  pop(); // 座標基準を元にもどす
}