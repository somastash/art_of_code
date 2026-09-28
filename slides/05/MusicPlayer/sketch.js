let song; // サウンドオブジェクトを入れる変数

// ファイル読み込み
function preload() {
  song = loadSound('songs/titanic (demo) by Arlie.mp3');
}

function setup() {
  createCanvas(400, 400);

  // サウンド再生
  song.play();

  // サウンド解析ライブラリを初期化
  analyzer = new p5.Amplitude();
  analyzer.setInput(song); // 解析対象を指定
  analyzer.smooth(0.5);
}

function draw() {
  // 背景
  fill('rgba(0, 0, 0, 0.2)');
  rect(0, 0, 400, 400);

  // 現在の RMS 値を取得
  let rms = analyzer.getLevel();

  // 円を描画
  fill('white');
  noStroke();
  circle(200, 200, rms * 400);
}


// Song by Arlie
// https://www.arlie.band/
// https://open.spotify.com/artist/6Bllzm0olEwqGwPujaLiuA?si=6XHvLTKwTB-ciHGaGyD-qA&nd=1
//
// https://editor.p5js.org/amekusa/sketches/-5YQoKdUJ