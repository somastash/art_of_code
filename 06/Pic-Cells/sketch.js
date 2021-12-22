let img;        // 画像オブジェクト
let rate = 6;   // 画像サンプリングレート
let cells = []; // セルを入れる配列

// ファイル読み込み
function preload() {
  img = loadImage('img/japanese-tram-by-1041uuu.gif');
}

function setup() {
  createCanvas(img.width, img.height);
  frameRate(30); // フレームレート (FPS)

  // 画像のピクセルデータをメモリに読み込む
  img.loadPixels();

  // 画像をピクセル単位でサンプリングする
  for (let x = rate/2; x < img.width; x += rate) {
    for (let y = rate/2; y < img.height; y += rate) {
      let c = img.get(x, y); // 画像の座標 (x, y) のピクセルの色取得
      cells.push( newCell(x, y, c) ); // セルを生成して配列に追加
    }
  }

}

function draw() {
  background(255);

  noStroke(); // 輪郭線なし

  // 配列内のセルを全て描画
  for (let i = 0; i < cells.length; i++) {
    cells[i].draw();
  }
}


// セルを生成して返す関数
// 返り値: オブジェクト
function newCell(x, y, c) {
  let cell = {
    posX:  x,
    posY:  y,
    color: c,

    // 自分自身を描画する関数
    draw: function () {
      fill(this.color);
      circle(this.posX, this.posY, rate);
    }
  };
  return cell; // できたセルを返す
}

// By Satoshi Soma @ Dec. 22, 2021
// https://editor.p5js.org/amekusa/sketches/0XDQSWwub