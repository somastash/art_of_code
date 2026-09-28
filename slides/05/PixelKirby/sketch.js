let img; // 画像オブジェクトを入れる変数

let scaleX = 20; // 拡大率 X
let scaleY = 20; // 拡大率 Y
let posX = 100;  // 表示位置 X
let posY = 100;  // 表示位置 Y

function preload() {
  // 画像を読み込み、img 変数に格納
  img = loadImage('kirby.png');
}

function setup() {
  createCanvas(400, 400);
}

// フレーム毎の処理
function draw() {
  background('antiquewhite');

  // 画像のサイズ情報表示
  fill('black'); // 文字色
  textSize(20);   // 文字サイズ
  text('W:' + img.width  + 'px', 40, 40); // 幅
  text('H:' + img.height + 'px', 40, 60); // 高さ

  // 画像のピクセル情報読み込み
  img.loadPixels();
  
  // 画像をピクセル単位でスキャンする
  for (let x = 0; x < img.width; x++) {  // 幅の分だけループ
    for (let y = 0; y < img.height; y++) { // 高さの分だけループ
      
      // 画像の x, y 位置の色を取得し、
      // 変数 c に格納
      let c = img.get(x, y);
      
      // 変数 c を塗りの色に指定
      fill(c);
      noStroke();
      
      // ドットの位置とサイズ
      let dotX = x * scaleX;
      let dotY = y * scaleY;
      let dotSize = 20;
      
      // ドット描画
      push();
      translate(posX, posY);
      // rect(dotX, dotY, dotSize, dotSize);
      circle(dotX, dotY, dotSize);
      pop();
    }
  }
}