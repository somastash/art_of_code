let song; // サウンドオブジェクトを入れる変数

// ファイル読み込み
function preload() {
  song = loadSound('songs/titanic (demo) by Arlie.mp3');
}

function setup() {
  createCanvas(400, 400);

  // サウンド再生
  song.play();

  // サウンド解析ライブラリを準備
  analyzer = new p5.Amplitude();
  analyzer.setInput(song); // 解析対象を指定
  analyzer.smooth(0.5);

  // フーリエ変換ライブラリを準備
  fft = new p5.FFT();
  fft.setInput(song); // 解析対象を指定
}

function draw() {

  // 背景
  fill('rgba(0, 0, 0, 0.2)');
  noStroke();
  rect(0, 0, 400, 400);

  // 現在の RMS 値を取得
  let rms = analyzer.getLevel();

  // 現在のスペクトルを取得
  let spectr = fft.analyze(512);

  // 波形描画
  stroke('red');
  beginShape();
  for (i = 0; i < spectr.length; i++) {
    let y = map(spectr[i], 0, 255, height, 0);
    vertex(i, y);
  }
  endShape();

  // 音の定位をマウスの位置に
  let panning = map(mouseX, 0, 400, -1.0, 1.0);
  song.pan(panning);

  // 円を描画
  fill('white');
  noStroke();
  circle(mouseX, 200, rms * 400);
}


// Song by Arlie
// https://www.arlie.band/
// https://open.spotify.com/artist/6Bllzm0olEwqGwPujaLiuA?si=6XHvLTKwTB-ciHGaGyD-qA&nd=1
//
// https://editor.p5js.org/amekusa/sketches/uCmyFkJ8F